import React from "react";

interface NaraLogoProps {
  showText?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function NaraLogo({ showText = true, className = "", size = "md", onClick }: NaraLogoProps) {
  const imgSizes = { sm: "h-7", md: "h-9", lg: "h-14" };

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
        className={`${imgSizes[size]} w-auto object-contain`}
      />
    </div>
  );
}