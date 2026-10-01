import { useEffect } from "react";
import "./our-approach.css";
// The page markup is the exported "Our Approach" HTML, kept verbatim (minus the bottom CTA and footer).
// To update the page, edit src/components/our-approach.html.
import approachHtml from "./our-approach.html?raw";

export default function OurApproachPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Our Approach — Incluread";
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return <div className="about-approach" dangerouslySetInnerHTML={{ __html: approachHtml }} />;
}
