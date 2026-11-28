interface SiteFooterProps {
  onGoToAbout: () => void;
  onGoToLegal: (section: "privacy" | "terms" | "cookies") => void;
  /** Leave room for the fixed bottom tab bar that the dashboard shows on phones */
  reserveBottomNav?: boolean;
}

// Link rows are 44px tall on phones (comfortable tap target) and plain inline text on desktop.
const linkClass = "inline-flex min-h-11 items-center text-left transition-colors hover:text-white md:min-h-0";
const headingClass = "mb-1 text-sm font-bold text-white md:mb-2 md:text-xs";

export default function SiteFooter({ onGoToAbout, onGoToLegal, reserveBottomNav = false }: SiteFooterProps) {
  return (
    <footer
      className={`mt-8 bg-[#0B1A2D] text-gray-400 ${
        reserveBottomNav ? "pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0" : ""
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-0 px-6 pb-2 pt-10 text-[15px] md:grid-cols-4 md:gap-6 md:py-8 md:text-xs">
        {/* Brand */}
        <div className="col-span-2 border-b border-[#1D3049] pb-8 md:col-span-1 md:border-0 md:pb-0">
          <img
            src="/incluread-logo-white.png"
            alt="Incluread"
            className="h-auto w-[190px] max-w-full md:w-[180px] lg:h-14 lg:w-auto"
            style={{ opacity: 0.9 }}
          />
          <p className="mt-4 max-w-[30ch] leading-relaxed md:mt-3 md:max-w-none md:opacity-70">
            Accessible reading for every mind. Built for dyslexia, ADHD, and visual stress.
          </p>
        </div>

        {/* Product */}
        <nav aria-label="Product" className="pt-6 md:pt-0">
          <h2 className={headingClass}>Product</h2>
          <ul className="md:space-y-1 md:opacity-70">
            <li>
              <button type="button" onClick={onGoToAbout} className={linkClass}>About Incluread</button>
            </li>
            <li>
              <a href="mailto:hello@incluread.click" className={linkClass}>Contact us</a>
            </li>
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Legal" className="pt-6 md:pt-0">
          <h2 className={headingClass}>Legal</h2>
          <ul className="md:space-y-1 md:opacity-70">
            <li>
              <button type="button" onClick={() => onGoToLegal("privacy")} className={linkClass}>Privacy Policy</button>
            </li>
            <li>
              <button type="button" onClick={() => onGoToLegal("terms")} className={linkClass}>Terms of Use</button>
            </li>
            <li>
              <button type="button" onClick={() => onGoToLegal("cookies")} className={linkClass}>Cookie Policy</button>
            </li>
          </ul>
        </nav>

        {/* Research */}
        <div className="col-span-2 mt-6 border-t border-[#1D3049] pt-6 md:col-span-1 md:mt-0 md:border-0 md:pt-0">
          <h2 className={headingClass}>Research</h2>
          <p className="leading-relaxed md:opacity-70">Built on peer-reviewed dyslexia research.</p>
          <button
            type="button"
            onClick={onGoToAbout}
            className="mt-1 inline-flex min-h-11 items-center text-left text-[#FE987A] underline transition-colors hover:text-white md:mt-0 md:min-h-0"
          >
            Read our approach →
          </button>
        </div>
      </div>

      <div className="border-t border-[#1D3049] px-6 py-5 text-center text-xs leading-relaxed text-gray-400 md:py-4 md:opacity-50">
        © {new Date().getFullYear()} Incluread. All rights reserved. · incluread.click
      </div>
    </footer>
  );
}