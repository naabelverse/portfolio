import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

/**
 * Three public routes. /styleguide is deliberately absent — it is a build
 * artefact for checking the design system, not a page anyone should land on.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Captured once at build time; every route here is statically rendered.
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects/forgeroom`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
