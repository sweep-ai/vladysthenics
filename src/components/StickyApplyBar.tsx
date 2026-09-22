"use client";

import { useEffect, useState } from "react";
import { cta } from "@/data/copy";
import { scrollToApplication } from "./ApplyButton";

export function StickyApplyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("application-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.12 },
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-apply" role="region" aria-label="Apply">
      <button type="button" className="apply-btn" onClick={scrollToApplication}>
        {cta.sticky}
      </button>
    </div>
  );
}