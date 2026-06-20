// Real public-domain book text pipeline (Project Gutenberg via Gutendex).
// Runs server-side so: (1) no browser CORS issues hitting gutenberg.org directly,
// (2) automated fetches to Gutenberg's servers are funneled through one
// identified client with a proper User-Agent, instead of every visitor's
// browser hitting gutenberg.org independently, which is closer to what
// Gutenberg's own guidance for automated tools asks for.
//
// Returns { found: false, reason } when no confident, confirmed-public-domain
// match exists — the caller (Dashboard.tsx) falls back to the existing
// AI-generation pipeline in that case. This endpoint never throws a hard
// error for "no match"; it's an expected, normal outcome.

interface GutendexPerson {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

interface GutendexBook {
  id: number;
  title: string;
  authors: GutendexPerson[];
  copyright: boolean | null;
  formats: Record<string, string>;
}

const USER_AGENT = "Incluread/1.0 (+https://incluread.click; contact hello@incluread.click)";

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

// Guards against Gutendex returning a copyright:false book that just happens
// to share generic search words with the requested title (e.g. a search for
// "Emma" matching an unrelated obscure work also called "Emma"). Not perfect,
// but catches the obviously-wrong cases.
function isReasonableMatch(requestedTitle: string, candidate: GutendexBook): boolean {
  const reqNorm = normalize(requestedTitle);
  const candNorm = normalize(candidate.title);
  if (!reqNorm || !candNorm) return false;
  if (candNorm.includes(reqNorm) || reqNorm.includes(candNorm)) return true;
  const reqWords = reqNorm.split(" ").filter(w => w.length > 3);
  if (reqWords.length === 0) return false;
  const overlap = reqWords.filter(w => candNorm.includes(w)).length;
  return overlap / reqWords.length >= 0.5;
}

const CHAPTER_HEADER_RE =
  /^(chapter|book|part)\s+([ivxlcdm]+|\d{1,3}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\b/i;

function stripGutenbergBoilerplate(rawText: string): string {
  let body = rawText;
  const startMatch = body.match(/\*\*\*\s*start of (?:this|the) project gutenberg ebook[^*]*\*\*\*/i);
  if (startMatch && startMatch.index !== undefined) {
    body = body.slice(startMatch.index + startMatch[0].length);
  }
  const endIdx = body.search(/\*\*\*\s*end of (?:this|the) project gutenberg ebook[^*]*\*\*\*/i);
  if (endIdx >= 0) {
    body = body.slice(0, endIdx);
  }
  return body.trim();
}

function parseChapters(body: string): { title: string; content: string[] }[] {
  const lines = body.split("\n");
  const headerLineIndexes: number[] = [];
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.length > 0 && trimmed.length < 70 && CHAPTER_HEADER_RE.test(trimmed)) {
      headerLineIndexes.push(idx);
    }
  });

  let rawChapters: { title: string; text: string }[] = [];

  if (headerLineIndexes.length >= 2) {
    for (let i = 0; i < headerLineIndexes.length; i++) {
      const startLine = headerLineIndexes[i];
      const endLine = i + 1 < headerLineIndexes.length ? headerLineIndexes[i + 1] : lines.length;
      const headerText = lines[startLine].trim();
      const chapterBody = lines.slice(startLine + 1, endLine).join("\n").trim();
      if (chapterBody.length > 0) {
        rawChapters.push({ title: headerText, text: chapterBody });
      }
    }
  }

  // Fallback: no reliable "Chapter/Book/Part N" headers found in this particular
  // transcription style. Split into roughly equal word-count chunks instead, so
  // the book is still fully readable end-to-end — just without named chapter
  // breaks. This is clearly a lower-confidence split than a real header match.
  if (rawChapters.length < 2) {
    const words = body.split(/\s+/).filter(Boolean);
    const wordsPerChunk = 3000;
    const chunkCount = Math.max(1, Math.ceil(words.length / wordsPerChunk));
    rawChapters = Array.from({ length: chunkCount }, (_, i) => ({
      title: `Part ${i + 1}`,
      text: words.slice(i * wordsPerChunk, (i + 1) * wordsPerChunk).join(" ")
    }));
  }

  return rawChapters
    .map((ch, i) => {
      const paragraphs = ch.text
        .split(/\n\s*\n/)
        .map(p => p.replace(/\s+/g, " ").trim())
        .filter(p => p.length > 0);
      return {
        id: `chap-${i + 1}`,
        title: ch.title.replace(/\s+/g, " ").trim() || `Chapter ${i + 1}`,
        content: paragraphs.length > 0 ? paragraphs : [ch.text.trim()]
      } as { title: string; content: string[] } & { id: string };
    })
    .filter(ch => ch.content.length > 0 && ch.content[0].length > 0);
}

export default async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ found: false, reason: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }

  try {
    const { title, author } = await req.json();
    if (!title || typeof title !== "string") {
      return new Response(JSON.stringify({ found: false, reason: "No title provided" }), { status: 200, headers: corsHeaders });
    }

    // 1. Search Gutendex for candidate matches
    const searchTerm = author ? `${title} ${author}` : title;
    const searchRes = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(searchTerm)}`, {
      headers: { "User-Agent": USER_AGENT }
    });
    if (!searchRes.ok) {
      return new Response(JSON.stringify({ found: false, reason: "Gutendex search failed" }), { status: 200, headers: corsHeaders });
    }
    const searchData = await searchRes.json();
    const results: GutendexBook[] = searchData.results || [];
    if (!results.length) {
      return new Response(JSON.stringify({ found: false, reason: "No Gutendex match" }), { status: 200, headers: corsHeaders });
    }

    // 2. Only trust an EXPLICIT public-domain confirmation (copyright === false).
    // null means "unknown" — not safe enough to auto-serve as full text.
    const match = results.find(b => b.copyright === false && isReasonableMatch(title, b)) || null;
    if (!match) {
      return new Response(JSON.stringify({ found: false, reason: "No confirmed public-domain match" }), { status: 200, headers: corsHeaders });
    }

    // 3. Find a plain-text format URL
    const formats = match.formats || {};
    const textUrlKey = Object.keys(formats).find(k => k.startsWith("text/plain"));
    if (!textUrlKey) {
      return new Response(JSON.stringify({ found: false, reason: "No plain-text format available for this match" }), { status: 200, headers: corsHeaders });
    }
    const textUrl = formats[textUrlKey];

    // 4. Fetch the real text, server-side
    const textRes = await fetch(textUrl, { headers: { "User-Agent": USER_AGENT } });
    if (!textRes.ok) {
      return new Response(JSON.stringify({ found: false, reason: "Could not fetch book text file" }), { status: 200, headers: corsHeaders });
    }
    const rawText = await textRes.text();

    // 5. Strip Project Gutenberg's license header/footer boilerplate
    const body = stripGutenbergBoilerplate(rawText);
    if (body.length < 500) {
      return new Response(JSON.stringify({ found: false, reason: "Parsed text too short after stripping boilerplate" }), { status: 200, headers: corsHeaders });
    }

    // 6. Detect chapters + paragraphs
    const chapters = parseChapters(body);
    if (chapters.length === 0) {
      return new Response(JSON.stringify({ found: false, reason: "Could not parse any readable chapters" }), { status: 200, headers: corsHeaders });
    }

    return new Response(JSON.stringify({
      found: true,
      source: "gutenberg",
      gutenbergId: match.id,
      title: match.title,
      author: match.authors?.[0]?.name || author || "",
      chapters
    }), { status: 200, headers: corsHeaders });

  } catch (err: any) {
    return new Response(JSON.stringify({ found: false, reason: "error", error: err.message || "Unknown error" }), {
      status: 200,
      headers: corsHeaders,
    });
  }
};

export const config = { path: "/api/booktext" };
