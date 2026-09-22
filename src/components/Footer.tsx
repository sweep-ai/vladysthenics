import Link from "next/link";
import { brand } from "@/data/copy";
import { legalLinks, socialLinks } from "@/data/social";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">{brand.name}</p>
        <nav className="site-footer__nav" aria-label="Footer">
          <div className="site-footer__group">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
          <div className="site-footer__group">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <p className="site-footer__note">
          Application-only coaching. Results vary. Not medical advice.
        </p>
      </div>
    </footer>
  );
}