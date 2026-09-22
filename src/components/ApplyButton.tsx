"use client";

import { cta } from "@/data/copy";

type Props = {
  label?: string;
  variant?: "primary" | "inverse";
  className?: string;
  onClick?: () => void;
};

export function scrollToApplication() {
  const el = document.getElementById("application-form");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function ApplyButton({
  label = cta.apply,
  variant = "primary",
  className = "",
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={`apply-btn apply-btn--${variant} ${className}`.trim()}
      onClick={() => {
        onClick?.();
        scrollToApplication();
      }}
    >
      {label}
    </button>
  );
}