"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/conversionTracking";

export function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    void trackPageView(pathname);
  }, [pathname]);

  return null;
}