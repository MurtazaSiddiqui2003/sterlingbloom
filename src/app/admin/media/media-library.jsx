"use client";

import { useEffect, useState } from "react";

export default function MediaLibrary() {
  const [items, setItems] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/media", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load media.");
      setItems(data.items || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function upload() {
    if (!files.length) return;
    setUploading(true);
    setMessage("");
    try {
      const signResponse = await fetch("/api/admin/media/sign");
      const sign = await signResponse.json();
      if (!signResponse.ok) throw new Error(sign.error || "Unable to prepare upload.");

      for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        form.append("api_key", sign.apiKey);
        form.append("timestamp", String(sign.timestamp));
        form.append("folder", sign.folder);
        form.append("signature", sign.signature);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/auto/upload`, {
          method: "POST",
          body: form,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "Cloudinary upload failed.");

        const saveResponse = await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId: data.public_id,
            url: data.url,
            secureUrl: data.secure_url,
            resourceType: data.resource_type,
            format: data.format,
            folder: data.folder,
            bytes: data.bytes,
            width: data.width,
            height: data.height,
            title: file.name.replace(/\.[^.]+$/, ""),
            alt: file.name.replace(/\.[^.]+$/, ""),
          }),
        });
        const saved = await saveResponse.json();
        if (!saveResponse.ok) throw new Error(saved.error || "Media record could not be saved.");
      }

      setFiles([]);
      setMessage("Upload complete.");
      await load();
    } catch (error) {
      setMessage(error.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[22px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B68A35]">UPLOAD</p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-medium">Add new media</h3>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input type="file" multiple accept="image/*,video/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} className="block w-full rounded-xl border border-gray-200 bg-[#FBFAF7] p-3 text-sm" />
          <button type="button" onClick={upload} disabled={!files.length || uploading} className="btn-primary shrink-0 rounded-xl px-6 py-3 text-xs uppercase tracking-[0.14em] disabled:opacity-50">
            {uploading ? "Uploading..." : `Upload ${files.length ? files.length : ""} File${files.length === 1 ? "" : "s"}`}
          </button>
        </div>
        {message && <p className="mt-4 text-sm text-gray-500">{message}</p>}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium">Library</h3>
          <span className="text-xs text-gray-400">{items.length} asset{items.length === 1 ? "" : "s"}</span>
        </div>
        {loading ? <p className="text-sm text-gray-400">Loading media…</p> : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <article key={item.publicId} className="overflow-hidden rounded-[18px] border border-gray-200 bg-white">
                <div className="aspect-[4/3] bg-gray-100">
                  {item.resourceType === "video" ? (
                    <video src={item.secureUrl} controls className="h-full w-full object-cover" />
                  ) : (
                    <img src={item.secureUrl} alt={item.alt || item.title || ""} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <p className="truncate text-sm font-medium">{item.title || item.publicId}</p>
                  <p className="mt-1 truncate text-[11px] text-gray-400">{item.publicId}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
