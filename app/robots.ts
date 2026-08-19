import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The styleguide is a design-system proof sheet, not content.
      disallow: ["/styleguide"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
