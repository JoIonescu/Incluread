import React, { useState } from "react";

interface NaraLogoProps {
  showText?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function NaraLogo({ showText = true, className = "", size = "md", onClick }: NaraLogoProps) {
  const imgSizes = { sm: "h-12", md: "h-9", lg: "h-14" };

  // Logo files often have empty (transparent) space on the left. We measure it once the image has loaded and
  // shift the picture left by that amount, so the visible logo lines up with the page's left edge
  // whatever file is used.
  const [leftTrim, setLeftTrim] = useState(0);
  const measureLeftPadding = (e: React.SyntheticEvent<HTMLImageElement>) => {
    try {
      const img = e.currentTarget;
      if (!img.naturalWidth || !img.naturalHeight) return;
      const scale = Math.min(1, 600 / img.naturalWidth);
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          if (data[(y * w + x) * 4 + 3] > 24) {
            setLeftTrim(x / w);
            return;
          }
        }
      }
    } catch {
      /* measuring is a nicety; if it fails the logo simply keeps its natural position */
    }
  };

  const clickable = onClick
    ? {
        onClick,
        role: "button" as const,
        tabIndex: 0,
        "aria-label": "Go to library",
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  return (
    <div id="incluread-logo-container" className={`flex items-center gap-2 ${onClick ? "cursor-pointer" : ""} ${className}`} {...clickable}>
      <img
        src="/incluread-logo.png"
        alt="Incluread"
        onLoad={measureLeftPadding}
        style={leftTrim ? { transform: `translateX(-${(leftTrim * 100).toFixed(2)}%)` } : undefined}
        className={`${imgSizes[size]} w-auto object-contain`}
      />
    </div>
  );
}