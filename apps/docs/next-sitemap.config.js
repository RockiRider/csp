/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://vite-posthog.tsotne.co.uk",
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  sitemapSize: 100,
  output: "export",
  additionalPaths: async () => [
    {
      loc: "/",
      priority: "1.0",
    },
    {
      loc: "/getting-started",
      priority: 0.9,
    },
    {
      loc: "/react/core",
      priority: 0.6,
    },
    {
      loc: "/react/feature-flags",
      priority: 0.6,
    },
  ],
};
