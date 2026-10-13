export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://sterlingbloom.vercel.app";
  return [{
    url: base.replace(/\/$/, ""),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }];
}
