"use client";

import Link from "next/link";
import { brand } from "@/data/copy";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-header__brand">
        {brand.name}
      </Link>
      <p className="site-header__slots">
        <span className="site-header__slots-dot" aria-hidden="true" />
        {brand.slotsLabel}
      </p>
    </header>
  );
}
