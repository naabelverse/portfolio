import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { TopNav } from "@/components/layout/top-nav";
import { links, profile, siteUrl } from "@/content/site";
import "./globals.css";

/**
 * Bricolage Grotesque carries the headings; its optical-size axis is what
 * keeps the 96px hero tight and the 20px h3 open. Figtree is everything
 * else. JetBrains Mono only where something is literally code.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "400",
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
    "Next.js",
    "TypeScript",
    "AI integration",
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
  // Matches --color-paper so the browser chrome reads as part of the page.
  themeColor: "#FAFAF7",
  colorScheme: "light",
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
      className={`${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-cobalt focus:px-4 focus:py-2 focus:text-small focus:font-semibold focus:text-white"
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
