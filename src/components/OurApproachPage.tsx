import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import "./our-approach.css";
// The page content is the exported "Our Approach" HTML, kept verbatim (without its own nav, CTA and footer).
// To update the page, edit src/components/our-approach.html.
import approachHtml from "./our-approach.html?raw";
import SiteHeader, { DashboardTab } from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import MobileTabBar from "./MobileTabBar";

interface OurApproachPageProps {
  /** Go back to the page the visitor came from */
  onBack: () => void;
  onOpenTab: (tab: DashboardTab) => void;
  onGoToAbout: () => void;
  onGoToLegal: (section: "privacy" | "terms" | "cookies") => void;
}

export default function OurApproachPage({ onBack, onOpenTab, onGoToAbout, onGoToLegal }: OurApproachPageProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Our Approach — Incluread";
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <>
      <SiteHeader onOpenTab={onOpenTab} />
      <div className="mx-auto w-full max-w-6xl px-3 pt-3 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back to the previous page"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#19334A] transition-colors hover:bg-[#CBDDF3]/60"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>
      <div className="about-approach" dangerouslySetInnerHTML={{ __html: approachHtml }} />
      <SiteFooter onGoToAbout={onGoToAbout} onGoToLegal={onGoToLegal} reserveBottomNav />
      <MobileTabBar onSelect={onOpenTab} />
    </>
  );
}