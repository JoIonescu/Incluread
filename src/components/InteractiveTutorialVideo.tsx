import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Clock, Upload, BookOpen, Brain, Star } from "lucide-react";

export default function InteractiveTutorialVideo() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [showCC, setShowCC] = useState<boolean>(true);

  // Step 1 video covers ONLY what the reader wizard steps 2-7 do NOT cover:
  // — The global library (Open Library + uploaded docs)
  // — The AI Reading Coach (explain, simplify, summarise)
  // — Focus ruler & sensory modes in the actual reader
  // — Bookmarks and reading progress tracking
  const videoSteps = [
    {
      title: "1. Your Library — Millions of Books",
      desc: "Browse thousands of accessible public-domain titles by genre, or upload your own PDF, Word doc, or text file to read with all Incluread tools.",
      caption: "Welcome to Incluread. Your library holds millions of public-domain books — and anything you upload. Every title opens with your personal reading settings already applied.",
      color: "from-[#EEF5FA] to-[#D0DFEB]",
      icon: <BookOpen className="w-5 h-5 text-[#5B8FB9]" />,
      contentComp: (
        <div className="space-y-2">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#5B8FB9]">Your Library</p>
          <div className="flex gap-2 overflow-hidden">
            {[
              { title: "Alice in Wonderland", color: "from-purple-400 to-indigo-500" },
              { title: "Frankenstein", color: "from-slate-500 to-slate-700" },
              { title: "Your Upload.pdf", color: "from-[#5B8FB9] to-[#2D5A8A]" },
            ].map((b) => (
              <div key={b.title} className={`flex-shrink-0 w-14 h-20 rounded-lg bg-gradient-to-br ${b.color} flex items-end p-1.5 shadow-md`}>
                <span className="text-white text-[7px] font-bold leading-tight line-clamp-2">{b.title}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {["Classics", "Fantasy", "Upload"].map(tag => (
              <span key={tag} className="text-[8px] font-bold px-1.5 py-0.5 bg-[#5B8FB9]/10 text-[#5B8FB9] rounded border border-[#5B8FB9]/20">{tag}</span>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "2. Upload Your Own Documents",
      desc: "Teachers, parents, and students can upload any PDF or Word document. Incluread instantly formats it with accessibility tools — syllable breaks, spacing, TTS, and AI support.",
      caption: "Have a school book, article, or document? Upload it as a PDF or Word file. Incluread formats it instantly — no reformatting needed. Perfect for teachers sharing reading materials with students.",
      color: "from-amber-50 to-orange-100",
      icon: <Upload className="w-5 h-5 text-amber-600" />,
      contentComp: (
        <div className="space-y-2 text-center">
          <div className="border-2 border-dashed border-amber-300 rounded-xl p-3 bg-amber-50/50">
            <Upload className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <p className="text-[9px] font-black text-amber-700">Drop PDF or Word file</p>
            <p className="text-[8px] text-amber-500 mt-0.5">Instantly readable with all tools</p>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-amber-200 rounded-lg p-1.5">
            <div className="w-8 h-10 rounded bg-gradient-to-br from-[#5B8FB9] to-[#2D5A8A] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[7px] font-black">PDF</span>
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-700">chapter_1.pdf</p>
              <p className="text-[7px] text-[#5B8FB9]">✓ Ready to read</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. AI Reading Coach",
      desc: "Select any paragraph and ask Incluread AI to explain it, simplify it at three levels, or summarise the whole chapter. Like having a reading tutor always available.",
      caption: "Struggling with a difficult paragraph? Tap Simplify and choose how much — a little, a lot, or child-friendly. Or tap Explain to get a plain-language breakdown. The AI coach is always there, ready to help.",
      color: "from-emerald-50 to-teal-100",
      icon: <Brain className="w-5 h-5 text-emerald-600" />,
      contentComp: (
        <div className="space-y-1.5">
          <p className="text-[9px] font-black uppercase text-emerald-700">AI Reading Coach</p>
          <div className="bg-white border border-emerald-200 rounded-lg p-2 text-[9px] text-slate-500 line-through">
            "The metaphysical implications of this epoch require meticulous deconstruction..."
          </div>
          <div className="flex gap-1">
            {["Simpler", "Much simpler", "Child-friendly"].map((l, i) => (
              <span key={l} className={`text-[7px] font-black px-1.5 py-0.5 rounded ${i === 1 ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>{l}</span>
            ))}
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2">
            <p className="text-[9px] font-bold text-emerald-900">This time period has complex ideas — let's break them down step by step.</p>
          </div>
        </div>
      )
    },
    {
      title: "4. Bookmarks & Reading Progress",
      desc: "Bookmark any paragraph to return to it later. Your reading position is saved automatically — pick up exactly where you left off, on any device, every time.",
      caption: "Tap the bookmark button on any paragraph to save your spot. Your reading position — chapter, paragraph, and all your settings — is saved automatically, so you always pick up exactly where you stopped.",
      color: "from-violet-50 to-purple-100",
      icon: <Star className="w-5 h-5 text-violet-600" />,
      contentComp: (
        <div className="space-y-2">
          <p className="text-[9px] font-black uppercase text-violet-700">Reading Progress</p>
          <div className="bg-white border border-violet-200 rounded-lg p-2 space-y-1.5">
            <div className="flex items-center justify-between text-[8px]">
              <span className="font-bold text-slate-700">Chapter 3 · Paragraph 12</span>
              <span className="text-violet-600 font-black">★ Saved</span>
            </div>
            <div className="w-full h-1.5 bg-violet-100 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: "42%" }} />
            </div>
            <p className="text-[7px] text-slate-400">42% complete · Auto-saved</p>
          </div>
          <div className="bg-violet-50 border border-violet-100 rounded-lg p-1.5 text-[8px] text-violet-700 font-medium">
            📱 Synced across all your devices
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!isPlaying) {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      return;
    }

    let interval: NodeJS.Timeout | null = null;
    let voiceEnded = false;
    let transitionTimeout: NodeJS.Timeout | null = null;

    const cleanText = videoSteps[activeStep].caption;
    const wordCount = cleanText.split(/\s+/).length;
    const speakingDurationMs = (wordCount / 130) * 60 * 1000;
    const estDuration = isMuted ? 8500 : Math.max(7500, speakingDurationMs + 1000);
    const startTime = Date.now();

    if (!isMuted && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const scoredVoices = [...voices]
        .filter(v => v.lang.toLowerCase().startsWith("en"))
        .sort((a, b) => {
          const score = (name: string) => {
            let s = 0;
            if (name.includes("natural") || name.includes("online")) s += 20;
            if (name.includes("google")) s += 12;
            if (name.includes("premium") || name.includes("alex")) s += 10;
            if (name.includes("samantha") || name.includes("daniel") || name.includes("jenny")) s += 5;
            return s;
          };
          return score(b.name.toLowerCase()) - score(a.name.toLowerCase());
        });

      const selectedVoice = scoredVoices[0] || voices.find(v => v.lang.startsWith("en")) || voices[0];
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.onend = () => { voiceEnded = true; };
      utterance.onerror = () => { voiceEnded = true; };
      window.speechSynthesis.speak(utterance);
    } else {
      voiceEnded = true;
    }

    interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let pct = (elapsed / estDuration) * 100;
      if (pct >= 99) {
        if (!isMuted && !voiceEnded) {
          pct = 99;
        } else {
          pct = 100;
          clearInterval(interval!);
          transitionTimeout = setTimeout(() => {
            setProgress(0);
            setActiveStep((prev) => (prev + 1) % videoSteps.length);
          }, 1200);
        }
      }
      setProgress(Math.min(100, pct));
    }, 100);

    return () => {
      if (interval) clearInterval(interval);
      if (transitionTimeout) clearTimeout(transitionTimeout);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [isPlaying, activeStep, isMuted]);

  return (
    <div className="bg-stone-900 text-white rounded-2xl overflow-hidden border border-stone-800 shadow-xl flex flex-col">

      {/* Screen */}
      <div className="relative h-60 bg-gradient-to-br from-stone-950 to-stone-900 flex flex-col justify-between p-4 select-none">

        {/* Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase text-[#00A795]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A795] animate-pulse" />
            Incluread Feature Tour
          </div>
          <span className="text-[10px] font-bold text-gray-400 font-mono">
            {activeStep + 1} / {videoSteps.length}
          </span>
        </div>

        {/* Content frame */}
        <div className="my-auto max-w-sm mx-auto w-full transform scale-95 transition-all duration-300">
          <div className={`p-3 rounded-2xl bg-gradient-to-r shadow-inner ${videoSteps[activeStep].color} transition-all duration-500`}>
            {videoSteps[activeStep].contentComp}
          </div>
        </div>

        {/* CC captions */}
        {showCC && (
          <div className="bg-black/85 border border-white/10 p-2.5 rounded-xl text-center text-[11px] font-medium leading-relaxed text-gray-200 z-10">
            {videoSteps[activeStep].caption}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-stone-800 h-1.5 overflow-hidden">
        <div className="bg-[#00A795] h-full transition-all duration-100 rounded-r-sm" style={{ width: `${progress}%` }} />
      </div>

      {/* Controls */}
      <div className="p-3 bg-stone-950 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs border-t border-stone-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isPlaying ? "bg-[#00A795] text-stone-950 hover:bg-[#00c4ad]" : "bg-[#5B8FB9] text-white hover:bg-[#497A9E]"
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
              isMuted ? "border-stone-700 text-stone-500" : "border-stone-800 text-[#00A795] bg-stone-900"
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setShowCC(!showCC)}
            className={`px-2.5 py-1 rounded text-[10px] font-black uppercase border transition-all ${
              showCC ? "bg-stone-800 text-white border-transparent" : "text-stone-500 border-stone-800"
            }`}
          >
            CC
          </button>
        </div>

        {/* Step dots */}
        <div className="flex gap-1.5">
          {videoSteps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => { setActiveStep(idx); setProgress(0); }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${idx === activeStep ? "bg-[#00A795] scale-125" : "bg-stone-700"}`}
              title={s.title}
            />
          ))}
        </div>

        <div className="text-[10px] text-stone-400 font-bold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{isPlaying ? "Tour playing..." : "Tap play for audio walkthrough"}</span>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 bg-stone-900/50 text-stone-300 text-[11px] leading-relaxed border-t border-stone-800">
        <div className="flex items-center gap-1.5 mb-1">
          {videoSteps[activeStep].icon}
          <p className="font-extrabold text-white text-xs">{videoSteps[activeStep].title}</p>
        </div>
        <p className="text-stone-400">{videoSteps[activeStep].desc}</p>
      </div>
    </div>
  );
}