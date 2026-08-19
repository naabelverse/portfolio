import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { TopNav } from "@/components/layout/top-nav";
import { links, profile, siteUrl } from "@/content/site";
import "./globals.css";

/**
 * DESIGN.md names Inter as the closest free substitute for Linear's display
 * and text cuts, and JetBrains Mono for the mono. Both are variable fonts, so
 * the whole 400–700 range ships in one file, self-hosted by next/font.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.displayName} — ${profile.role}`,
    template: `%s — ${profile.displayName}`,
  },
  description: profile.metaDescription,
  applicationName: `${profile.displayName} — portfolio`,
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  keywords: [
    profile.fullName,
    "software engineering",
    "Flutter developer",
    "Node.js",
    "internship",
    "UTHM",
    "Malaysia",
  ],
  openGraph: {
    type: "profile",
    locale: "en_MY",
    url: siteUrl,
    siteName: profile.displayName,
    title: `${profile.displayName} — ${profile.role}`,
    description: profile.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.displayName} — ${profile.role}`,
    description: profile.metaDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Matches {colors.canvas}. The browser chrome should not be lighter than
  // the page it frames.
  themeColor: "#010102",
  colorScheme: "dark",
};

/** Structured data so search results attribute the work to a person. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.displayName,
  url: siteUrl,
  jobTitle: profile.role,
  description: profile.metaDescription,
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.university },
  address: { "@type": "PostalAddress", addressCountry: "MY" },
  sameAs: [links.github, links.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Next.js 16 no longer overrides scroll-behavior during navigation
      // unless this attribute is present; without it, route changes inherit
      // the smooth scrolling set for in-page anchors.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-body-sm focus:text-ink"
        >
          Skip to content
        </a>

        <TopNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
