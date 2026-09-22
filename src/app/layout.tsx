import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import { RouteTracker } from "@/components/RouteTracker";
import { seo } from "@/data/copy";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <MetaPixel />
        <RouteTracker />
        {children}
      </body>
    </html>
  );
}