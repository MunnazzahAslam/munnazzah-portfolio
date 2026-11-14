import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Geist carries everything; Geist Mono handles the smaml labels. Both are
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.positioning,
  sameAs: profile.links.map((link) => link.href),
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
