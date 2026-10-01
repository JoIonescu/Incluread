import React from "react";
import { ArrowLeft } from "lucide-react";

type LegalSection = "privacy" | "terms" | "cookies";

interface LegalPageProps {
  onBack: () => void;
  onGoToAbout: () => void;
  initialSection?: LegalSection;
}

export default function LegalPage({ onBack, onGoToAbout, initialSection = "privacy" }: LegalPageProps) {
  const [activeSection, setActiveSection] = React.useState<LegalSection>(initialSection);

  return (
    <div className="min-h-screen bg-[#F7F4EE] font-sans">
      {/* Header */}
      <div className="bg-white border-b border-[#DCD9D0] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-[#5B8FB9] hover:text-[#3A6F9A] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Incluread
          </button>
          <div className="flex gap-1 ml-auto">
            <button onClick={onGoToAbout}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-500 hover:text-slate-800">
              About Incluread
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── PRIVACY POLICY ── */}
        {activeSection === "privacy" && (
          <div className="bg-white border border-[#DCD9D0] rounded-2xl p-8 space-y-6 text-sm text-[#333333] leading-relaxed">
            <div>
              <h1 className="text-2xl font-black text-[#111111] mb-1">Privacy Policy</h1>
              <p className="text-xs text-[#888888]">Last updated: June 2026</p>
            </div>
            {[
              { title: "1. Who we are", body: "Incluread (\"we\", \"us\", \"our\") is an accessible reading platform available at incluread.click. For privacy enquiries, contact hello@incluread.click." },
              { title: "2. What data we collect", body: "Account data: email address when you sign in via magic link. Reading preferences: font, theme, text size, spacing — stored locally and optionally in your account. Reading progress: chapter position, bookmarks, reading time — stored per-account to sync across devices. We do not collect names, payment data, or sensitive personal information." },
              { title: "3. How we use your data", body: "Solely to provide and improve the reading experience: syncing your preferences, restoring reading position, and displaying personalised reading statistics. We never sell, rent, or share your data with third parties for commercial purposes." },
              { title: "4. Third-party services", body: "Firebase (Google): authentication and database. Anthropic Claude API: AI reading assistance — text you send for explanation or simplification is processed by Anthropic. Open Library (Internet Archive): public domain book catalogue. None of these services receive your email address or personal data beyond what is necessary for the specific function." },
              { title: "5. Data retention", body: "Your account data is retained as long as your account is active. You may delete your account and all associated data at any time by emailing hello@incluread.click. Reading statistics for guest users reset daily; registered users reset every 30 days." },
              { title: "6. Your rights (GDPR)", body: "If you are in the EU/EEA or UK, you have the right to access, correct, or erase your personal data. You may also object to processing or request data portability. Contact hello@incluread.click to exercise these rights." },
              { title: "7. Children", body: "Incluread is designed for users aged 6 and above. Children under 13 must use Incluread with parental consent. We do not knowingly collect data from children without parental permission." },
              { title: "8. Changes", body: "We will notify registered users of material changes to this policy by email. Continued use of Incluread after changes constitutes acceptance of the updated policy." },
            ].map(({ title, body }) => (
              <div key={title} className="space-y-1">
                <h2 className="font-bold text-[#111111]">{title}</h2>
                <p className="text-xs text-[#444444]">{body}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── TERMS OF USE ── */}
        {activeSection === "terms" && (
          <div className="bg-white border border-[#DCD9D0] rounded-2xl p-8 space-y-6 text-sm text-[#333333] leading-relaxed">
            <div>
              <h1 className="text-2xl font-black text-[#111111] mb-1">Terms of Use</h1>
              <p className="text-xs text-[#888888]">Last updated: June 2026</p>
            </div>
            {[
              { title: "1. Acceptance", body: "By accessing or using Incluread at incluread.click, you agree to these Terms of Use. If you do not agree, please do not use the service." },
              { title: "2. Description of service", body: "Incluread is a web-based accessible reading platform that provides reading aids, AI-powered text assistance, and access to public domain literature. The service is provided as-is." },
              { title: "3. User accounts", body: "You may use Incluread without an account. Creating an account (via email magic link) allows you to sync preferences across devices. You are responsible for maintaining the security of your account." },
              { title: "4. Acceptable use", body: "You agree not to: attempt to reverse engineer or scrape the platform; use the AI features to generate harmful, misleading, or illegal content; circumvent any access controls; or use the service in a way that disrupts other users." },
              { title: "5. Intellectual property", body: "Books available through the Open Library integration are public domain works. Incluread's interface, branding, and codebase are proprietary. You may not reproduce, distribute, or create derivative works without written permission." },
              { title: "6. AI-generated content", body: "Text simplifications, explanations, and summaries are generated by AI and may contain errors. They are provided as reading aids only, not as authoritative interpretations of the source text." },
              { title: "7. Disclaimer", body: "Incluread is provided without warranties of any kind. We do not guarantee uninterrupted access or that the service will meet all accessibility needs." },
              { title: "8. Limitation of liability", body: "To the fullest extent permitted by law, Incluread shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service." },
              { title: "9. Governing law", body: "These terms are governed by the laws of the European Union and, where applicable, Polish law, without regard to conflict of law provisions." },
              { title: "10. Contact", body: "For questions about these terms, contact hello@incluread.click." },
            ].map(({ title, body }) => (
              <div key={title} className="space-y-1">
                <h2 className="font-bold text-[#111111]">{title}</h2>
                <p className="text-xs text-[#444444]">{body}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── COOKIE POLICY ── */}
        {activeSection === "cookies" && (
          <div className="bg-white border border-[#DCD9D0] rounded-2xl p-8 space-y-6 text-sm text-[#333333] leading-relaxed">
            <div>
              <h1 className="text-2xl font-black text-[#111111] mb-1">Cookie Policy</h1>
              <p className="text-xs text-[#888888]">Last updated: June 2026</p>
            </div>
            <p className="text-xs text-[#444444]">Incluread uses minimal cookies and local storage to function. We do not use advertising cookies, tracking pixels, or third-party analytics.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F7F4EE]">
                    <th className="text-left p-3 border border-[#DCD9D0] font-bold">Name</th>
                    <th className="text-left p-3 border border-[#DCD9D0] font-bold">Type</th>
                    <th className="text-left p-3 border border-[#DCD9D0] font-bold">Purpose</th>
                    <th className="text-left p-3 border border-[#DCD9D0] font-bold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "nara_cookie_consent", type: "Essential", purpose: "Stores your cookie consent choice", duration: "1 year" },
                    { name: "lumina_preferences", type: "Functional", purpose: "Saves your reading preferences (font, theme, spacing)", duration: "Persistent" },
                    { name: "lumina_position", type: "Functional", purpose: "Saves your reading position in a book", duration: "Persistent" },
                    { name: "lumina_stats", type: "Functional", purpose: "Stores local reading statistics", duration: "Session / 30 days" },
                    { name: "lumina_saved_book_ids", type: "Functional", purpose: "Remembers books saved to your shelf", duration: "Persistent" },
                    { name: "emailForSignIn", type: "Essential", purpose: "Temporarily stores email for magic link sign-in", duration: "Session" },
                    { name: "Firebase Auth", type: "Essential", purpose: "Maintains your authentication session", duration: "Session" },
                  ].map(({ name, type, purpose, duration }) => (
                    <tr key={name} className="border-b border-[#DCD9D0]">
                      <td className="p-3 border border-[#DCD9D0] font-mono text-[10px]">{name}</td>
                      <td className="p-3 border border-[#DCD9D0]">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${type === "Essential" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{type}</span>
                      </td>
                      <td className="p-3 border border-[#DCD9D0]">{purpose}</td>
                      <td className="p-3 border border-[#DCD9D0]">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-2">
              <h2 className="font-bold text-[#111111]">Managing cookies</h2>
              <p className="text-xs text-[#444444]">You can clear all Incluread cookies at any time by clearing your browser's local storage and cookies for incluread.click. Note that doing so will reset your reading preferences and sign you out. Incluread cannot function without essential cookies.</p>
            </div>
          </div>
        )}

      </div>
      {/* Footer on About page */}
      <footer className="bg-[#1a1a2e] text-gray-400 text-xs mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <img src="/incluread-logo.png" alt="Incluread" className="h-14 w-auto mb-3" style={{filter:"brightness(0) invert(1)", opacity:0.9}} />
            <p className="leading-relaxed opacity-70">Accessible reading for every mind.</p>
          </div>
          <div>
            <p className="text-white font-bold mb-2">Product</p>
            <ul className="space-y-1 opacity-70">
              <li><button onClick={onGoToAbout} className="hover:text-white transition-colors">About Incluread</button></li>
              <li><a href="mailto:hello@incluread.click" className="hover:text-white transition-colors">Contact us</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-bold mb-2">Legal</p>
            <ul className="space-y-1 opacity-70">
              <li><button onClick={() => setActiveSection("privacy")} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setActiveSection("terms")} className="hover:text-white transition-colors">Terms of Use</button></li>
              <li><button onClick={() => setActiveSection("cookies")} className="hover:text-white transition-colors">Cookie Policy</button></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-bold mb-2">Research</p>
            <p className="opacity-70 leading-relaxed text-[11px]">Built on peer-reviewed dyslexia research. <button onClick={onGoToAbout} className="underline text-[#00A795]">Read our approach →</button></p>
          </div>
        </div>
        <div className="border-t border-[#2d2d4e] px-6 py-4 text-center opacity-50">
          © {new Date().getFullYear()} Incluread. All rights reserved.
        </div>
      </footer>
    </div>
  );
}