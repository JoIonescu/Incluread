interface SiteFooterProps {
  onGoToAbout: () => void;
  onGoToLegal: (section: "privacy" | "terms" | "cookies") => void;
}

export default function SiteFooter({ onGoToAbout, onGoToLegal }: SiteFooterProps) {
  return (
    <footer className="bg-[#1a1a2e] text-gray-400 text-xs mt-8">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <img src="/incluread-logo.png" alt="Incluread" className="h-14 w-auto mb-3" style={{filter:"brightness(0) invert(1)", opacity:0.9}} />
          <p className="leading-relaxed opacity-70">Accessible reading for every mind. Built for dyslexia, ADHD, and visual stress.</p>
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
            <li><button onClick={() => onGoToLegal("privacy")} className="hover:text-white transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => onGoToLegal("terms")} className="hover:text-white transition-colors">Terms of Use</button></li>
            <li><button onClick={() => onGoToLegal("cookies")} className="hover:text-white transition-colors">Cookie Policy</button></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-bold mb-2">Research</p>
          <p className="opacity-70 leading-relaxed">Built on peer-reviewed dyslexia research. <button onClick={onGoToAbout} className="underline text-[#00A795] hover:text-white">Read our approach →</button></p>
        </div>
      </div>
      <div className="border-t border-[#2d2d4e] px-6 py-4 text-center opacity-50">
        © {new Date().getFullYear()} Incluread. All rights reserved. · incluread.click
      </div>
    </footer>
  );
}