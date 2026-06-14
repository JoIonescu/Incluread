import React from "react";

interface NaraLogoProps {
  showText?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function NaraLogo({ showText = true, className = "", size = "md" }: NaraLogoProps) {
  const imgSizes = { sm: "h-7", md: "h-9", lg: "h-14" };

  return (
    <div id="incluread-logo-container" className={`flex items-center gap-2 ${className}`}>
      <img
        src="/incluread-logo.png"
        alt="Incluread"
        className={`${imgSizes[size]} w-auto object-contain`}
      />
    </div>
  );
}