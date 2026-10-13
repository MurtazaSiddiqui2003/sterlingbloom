export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://sterlingbloom.vercel.app";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: base.replace(/\/$/, "") + "/sitemap.xml",
    host: base,
  };
}
