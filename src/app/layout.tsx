import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Geist carries everything; Geist Mono handles the small labels. Both are
// downloaded at build time and served from this site, as variable woff2.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
// The label font falls back to a real monospace font, whose characters are
// as wide as Geist Mono's, rather than a scaled-up Arial. Lines then wrap the
// same before and after the font loads, so nothing on the page moves.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", "monospace"],
});

const description = "Senior frontend engineer in the UAE. Fast, accessible React products with AI that can't make things up, designed and built by the same person.";

export const metadata: Metadata = {
  title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
  description,
  openGraph: { type: "website", siteName: profile.name, title: `${profile.name} · ${profile.role}`, description },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
