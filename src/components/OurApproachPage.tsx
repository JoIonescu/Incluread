import { useEffect } from "react";
import "./our-approach.css";
// The page content is the exported "Our Approach" HTML, kept verbatim (without its own nav, CTA and footer).
// To update the page, edit src/components/our-approach.html.
import approachHtml from "./our-approach.html?raw";
import SiteHeader, { DashboardTab } from "./SiteHeader";
import SiteFooter from "./SiteFooter";

interface OurApproachPageProps {
  onOpenTab: (tab: DashboardTab) => void;
  onGoToAbout: () => void;
  onGoToLegal: (section: "privacy" | "terms" | "cookies") => void;
}

export default function OurApproachPage({ onOpenTab, onGoToAbout, onGoToLegal }: OurApproachPageProps) {
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
      <div className="about-approach" dangerouslySetInnerHTML={{ __html: approachHtml }} />
      <SiteFooter onGoToAbout={onGoToAbout} onGoToLegal={onGoToLegal} />
    </>
  );
}