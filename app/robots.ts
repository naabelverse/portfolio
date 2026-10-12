import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // /styleguide is kept out by its noindex meta, not here: a disallowed
      // page can't be crawled, so its noindex would never be seen.
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
