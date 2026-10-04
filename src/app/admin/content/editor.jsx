"use client";

import { useState } from "react";

function Field({ label, value, onChange, multiline = false, hint }) {
  const common = {
    value: value ?? "",
    onChange: (event) => onChange(event.target.value),
    className: "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#211d19] outline-none transition focus:border-[#B68A35] focus:ring-2 focus:ring-[#B68A35]/10",
  };

  return (
    <label className="block">
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">{label}</span>
      {multiline ? <textarea {...common} rows={4} /> : <input {...common} />}
      {hint && <span className="mt-1 block text-[11px] leading-5 text-gray-400">{hint}</span>}
    </label>
  );
}



function MediaPicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function openPicker() {
    setOpen(true);
    setLoading(true);
    try {
      const response = await fetch("/api/admin/media", { cache: "no-store" });
      const data = await response.json();
      if (response.ok) setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">{label}</span>
      <div className="mt-2 flex gap-3">
        <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#B68A35]" placeholder="Media URL" />
        <button type="button" onClick={openPicker} className="shrink-0 rounded-xl border border-[#D6B56D] px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#B68A35] hover:bg-[#B68A35]/5">Choose</button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-3 sm:items-center">
          <div className="max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-[22px] bg-[#F8F7F4] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 bg-white px-5 py-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#B68A35]">MEDIA LIBRARY</p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium">Choose an asset</h3>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg border px-3 py-2 text-xs text-gray-500">Close</button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-5">
              {loading ? <p className="text-sm text-gray-400">Loading library…</p> : items.length ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {items.map((item) => (
                    <button type="button" key={item.publicId} onClick={() => { onChange(item.secureUrl); setOpen(false); }} className="overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition hover:-translate-y-0.5 hover:border-[#B68A35]">
                      <div className="aspect-[4/3] bg-gray-100">
                        {item.resourceType === "video" ? <video src={item.secureUrl} muted className="h-full w-full object-cover" /> : <img src={item.secureUrl} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <p className="truncate px-3 py-2 text-xs text-gray-600">{item.title || item.publicId}</p>
                    </button>
                  ))}
                </div>
              ) : <p className="text-sm text-gray-400">No media yet. Upload something in Media Library first.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionCard({ eyebrow, title, children }) {
  return (
    <section className="rounded-[22px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B68A35]">{eyebrow}</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-medium">{title}</h2>
      <div className="mt-7 space-y-5">{children}</div>
    </section>
  );
}

export default function ContentEditor({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function update(section, key, value) {
    setContent((current) => ({
      ...current,
      [section]: { ...current[section], [key]: value },
    }));
  }

  function updateArray(section, key, index, field, value) {
    setContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: current[section][key].map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item,
        ),
      },
    }));
  }

  function updateNestedArray(section, key, index, field, value) {
    setContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: current[section][key].map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item,
        ),
      },
    }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed.");
      setContent(data.content);
      setMessage("Website content saved successfully.");
    } catch (error) {
      setMessage(error.message || "Could not save website content.");
    } finally {
      setSaving(false);
    }
  }

  function removeItem(section, key, index) {
    setContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: current[section][key].filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  }

  function addItem(section, key, item) {
    setContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: [...current[section][key], item],
      },
    }));
  }

  return (
    <div className="space-y-6">
      <SectionCard eyebrow="NAVIGATION" title="Navigation">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Brand Name" value={content.nav.brand} onChange={(v) => update("nav", "brand", v)} />
          <Field label="Consultation Button" value={content.nav.cta} onChange={(v) => update("nav", "cta", v)} />
          <Field label="Consultation Button Action" value={content.nav.ctaHref} onChange={(v) => update("nav", "ctaHref", v)} hint="Example: #contact, /consultation, or an external URL." />
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">Navigation Links</p>
          {content.nav.links.map(([label, href], index) => (
            <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
              <input value={label} onChange={(e) => {
                const links = [...content.nav.links];
                links[index] = [e.target.value, links[index][1]];
                update("nav", "links", links);
              }} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B68A35]" placeholder="Label" />
              <input value={href} onChange={(e) => {
                const links = [...content.nav.links];
                links[index] = [links[index][0], e.target.value];
                update("nav", "links", links);
              }} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B68A35]" placeholder="#section" />
              <button type="button" onClick={() => update("nav", "links", content.nav.links.filter((_, i) => i !== index))} className="rounded-xl border px-4 text-xs text-gray-500 hover:border-red-300 hover:text-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => update("nav", "links", [...content.nav.links, ["New Link", "#contact"]])} className="text-xs font-medium uppercase tracking-[0.12em] text-[#B68A35]">+ Add navigation link</button>
        </div>
      </SectionCard>

      <SectionCard eyebrow="HERO" title="Hero Section">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => update("hero", "eyebrow", v)} />
          <Field label="Primary Button" value={content.hero.primaryButton} onChange={(v) => update("hero", "primaryButton", v)} />
          <Field label="Primary Button Action" value={content.hero.primaryButtonHref} onChange={(v) => update("hero", "primaryButtonHref", v)} hint="Example: #contact, /consultation, or an external URL." />
          <Field label="Heading Before Highlight" value={content.hero.before} onChange={(v) => update("hero", "before", v)} />
          <Field label="Highlighted Heading" value={content.hero.highlight} onChange={(v) => update("hero", "highlight", v)} />
          <Field label="Heading After Highlight" value={content.hero.after} onChange={(v) => update("hero", "after", v)} />
          <Field label="Secondary Button" value={content.hero.secondaryButton} onChange={(v) => update("hero", "secondaryButton", v)} />
          <Field label="Secondary Button Action" value={content.hero.secondaryButtonHref} onChange={(v) => update("hero", "secondaryButtonHref", v)} hint="Example: #portfolio or /portfolio." />
        </div>
        <Field label="Description" value={content.hero.description} onChange={(v) => update("hero", "description", v)} multiline />
        <div className="grid gap-5 sm:grid-cols-2">
          <MediaPicker label="Background Image" value={content.hero.backgroundImage} onChange={(v) => update("hero", "backgroundImage", v)} />
          <Field label="Hero Video" value={content.hero.video} onChange={(v) => update("hero", "video", v)} />
        </div>
      </SectionCard>

      <SectionCard eyebrow="OUR STORY" title="About / Story">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.about.eyebrow} onChange={(v) => update("about", "eyebrow", v)} />
          <Field label="Button" value={content.about.button} onChange={(v) => update("about", "button", v)} />
          <Field label="Heading Before Highlight" value={content.about.before} onChange={(v) => update("about", "before", v)} />
          <Field label="Highlighted Heading" value={content.about.highlight} onChange={(v) => update("about", "highlight", v)} />
          <Field label="Heading After Highlight" value={content.about.after} onChange={(v) => update("about", "after", v)} />
          <MediaPicker label="Image" value={content.about.image} onChange={(v) => update("about", "image", v)} />
        </div>
        <Field label="Description" value={content.about.description} onChange={(v) => update("about", "description", v)} multiline />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">Story Features</p>
          <div className="mt-3 space-y-3">
            {content.about.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input value={feature} onChange={(e) => {
                  const features = [...content.about.features];
                  features[index] = e.target.value;
                  update("about", "features", features);
                }} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B68A35]" />
                <button type="button" onClick={() => update("about", "features", content.about.features.filter((_, i) => i !== index))} className="rounded-xl border px-4 text-xs text-gray-500 hover:border-red-300 hover:text-red-600">Remove</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => update("about", "features", [...content.about.features, "New feature"])} className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-[#B68A35]">+ Add feature</button>
        </div>
      </SectionCard>

      <SectionCard eyebrow="SERVICES" title="Services">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.services.eyebrow} onChange={(v) => update("services", "eyebrow", v)} />
          <Field label="Featured Label" value={content.services.featuredLabel} onChange={(v) => update("services", "featuredLabel", v)} />
          <Field label="Heading" value={content.services.heading} onChange={(v) => update("services", "heading", v)} />
          <Field label="Button" value={content.services.button} onChange={(v) => update("services", "button", v)} />
        </div>
        <Field label="Description" value={content.services.description} onChange={(v) => update("services", "description", v)} multiline />
        <div className="space-y-4">
          {content.services.items.map((item, index) => (
            <div key={item.id || index} className="rounded-2xl border border-gray-200 bg-[#FBFAF7] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">Service {String(index + 1).padStart(2, "0")}</p>
                <button type="button" onClick={() => removeItem("services", "items", index)} className="text-xs text-gray-400 hover:text-red-600">Remove</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" value={item.title} onChange={(v) => updateArray("services", "items", index, "title", v)} />
                <MediaPicker label="Image" value={item.image} onChange={(v) => updateArray("services", "items", index, "image", v)} />
              </div>
              <div className="mt-4">
                <Field label="Description" value={item.description} onChange={(v) => updateArray("services", "items", index, "description", v)} multiline />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addItem("services", "items", { id: Date.now(), title: "New Service", description: "", image: "" })} className="text-xs font-medium uppercase tracking-[0.12em] text-[#B68A35]">+ Add service</button>
        </div>
      </SectionCard>

      <SectionCard eyebrow="FEATURED WORK" title="Portfolio">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.gallery.eyebrow} onChange={(v) => update("gallery", "eyebrow", v)} />
          <Field label="Button" value={content.gallery.button} onChange={(v) => update("gallery", "button", v)} />
          <Field label="Heading" value={content.gallery.heading} onChange={(v) => update("gallery", "heading", v)} />
          <Field label="Bottom Note" value={content.gallery.note} onChange={(v) => update("gallery", "note", v)} />
        </div>
        <Field label="Description" value={content.gallery.description} onChange={(v) => update("gallery", "description", v)} multiline />
        <div className="space-y-4">
          {content.gallery.items.map((item, index) => (
            <div key={item.id || index} className="rounded-2xl border border-gray-200 bg-[#FBFAF7] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">Portfolio Item {String(index + 1).padStart(2, "0")}</p>
                <button type="button" onClick={() => removeItem("gallery", "items", index)} className="text-xs text-gray-400 hover:text-red-600">Remove</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Title" value={item.title} onChange={(v) => updateArray("gallery", "items", index, "title", v)} />
                <Field label="Category" value={item.category} onChange={(v) => updateArray("gallery", "items", index, "category", v)} />
                <MediaPicker label="Image" value={item.image} onChange={(v) => updateArray("gallery", "items", index, "image", v)} />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addItem("gallery", "items", { id: Date.now(), title: "New Work", category: "weddings", image: "" })} className="text-xs font-medium uppercase tracking-[0.12em] text-[#B68A35]">+ Add portfolio item</button>
        </div>
      </SectionCard>

      <SectionCard eyebrow="PROCESS" title="How It Works">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.process.eyebrow} onChange={(v) => update("process", "eyebrow", v)} />
          <Field label="Heading" value={content.process.heading} onChange={(v) => update("process", "heading", v)} />
        </div>
        <Field label="Description" value={content.process.description} onChange={(v) => update("process", "description", v)} multiline />
        <div className="space-y-4">
          {content.process.steps.map((step, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 bg-[#FBFAF7] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">Step {String(index + 1).padStart(2, "0")}</p>
                <button type="button" onClick={() => removeItem("process", "steps", index)} className="text-xs text-gray-400 hover:text-red-600">Remove</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Number" value={step.number} onChange={(v) => updateArray("process", "steps", index, "number", v)} />
                <Field label="Title" value={step.title} onChange={(v) => updateArray("process", "steps", index, "title", v)} />
              </div>
              <div className="mt-4"><Field label="Description" value={step.description} onChange={(v) => updateArray("process", "steps", index, "description", v)} multiline /></div>
            </div>
          ))}
          <button type="button" onClick={() => addItem("process", "steps", { number: String(content.process.steps.length + 1).padStart(2, "0"), title: "New Step", description: "" })} className="text-xs font-medium uppercase tracking-[0.12em] text-[#B68A35]">+ Add step</button>
        </div>
      </SectionCard>

      <SectionCard eyebrow="PACKAGES" title="Packages">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.packages.eyebrow} onChange={(v) => update("packages", "eyebrow", v)} />
          <Field label="Heading" value={content.packages.heading} onChange={(v) => update("packages", "heading", v)} />
          <Field label="Button" value={content.packages.button} onChange={(v) => update("packages", "button", v)} />
          <Field label="Featured Label" value={content.packages.featuredLabel} onChange={(v) => update("packages", "featuredLabel", v)} />
        </div>
        <Field label="Description" value={content.packages.description} onChange={(v) => update("packages", "description", v)} multiline />
        <Field label="Pricing Note" value={content.packages.note} onChange={(v) => update("packages", "note", v)} multiline />
        <div className="space-y-4">
          {content.packages.items.map((item, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 bg-[#FBFAF7] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">Package {String(index + 1).padStart(2, "0")}</p>
                <button type="button" onClick={() => removeItem("packages", "items", index)} className="text-xs text-gray-400 hover:text-red-600">Remove</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={item.name} onChange={(v) => updateArray("packages", "items", index, "name", v)} />
                <label className="flex items-end gap-3 pb-1 text-sm"><input type="checkbox" checked={!!item.featured} onChange={(e) => updateArray("packages", "items", index, "featured", e.target.checked)} /> Featured package</label>
              </div>
              <div className="mt-4"><Field label="Description" value={item.description} onChange={(v) => updateArray("packages", "items", index, "description", v)} multiline /></div>
              <div className="mt-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">Features</p>
                <div className="mt-3 space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-2">
                      <input value={feature} onChange={(e) => {
                        const features = [...item.features];
                        features[featureIndex] = e.target.value;
                        updateArray("packages", "items", index, "features", features);
                      }} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B68A35]" />
                      <button type="button" onClick={() => updateArray("packages", "items", index, "features", item.features.filter((_, i) => i !== featureIndex))} className="rounded-xl border px-3 text-xs text-gray-500">×</button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => updateArray("packages", "items", index, "features", [...item.features, "New feature"])} className="mt-3 text-xs text-[#B68A35]">+ Add feature</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addItem("packages", "items", { name: "New Package", description: "", features: [], featured: false })} className="text-xs font-medium uppercase tracking-[0.12em] text-[#B68A35]">+ Add package</button>
        </div>
      </SectionCard>

      <SectionCard eyebrow="TESTIMONIALS" title="Client Stories">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.testimonials.eyebrow} onChange={(v) => update("testimonials", "eyebrow", v)} />
          <Field label="Label" value={content.testimonials.label} onChange={(v) => update("testimonials", "label", v)} />
          <Field label="Heading" value={content.testimonials.heading} onChange={(v) => update("testimonials", "heading", v)} />
          <Field label="Launch Note" value={content.testimonials.note} onChange={(v) => update("testimonials", "note", v)} multiline />
        </div>
        <Field label="Description" value={content.testimonials.description} onChange={(v) => update("testimonials", "description", v)} multiline />
        <div className="space-y-4">
          {content.testimonials.items.map((item, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 bg-[#FBFAF7] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">Story {String(index + 1).padStart(2, "0")}</p>
                <button type="button" onClick={() => removeItem("testimonials", "items", index)} className="text-xs text-gray-400 hover:text-red-600">Remove</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Client Name" value={item.name} onChange={(v) => updateArray("testimonials", "items", index, "name", v)} />
                <Field label="Event" value={item.event} onChange={(v) => updateArray("testimonials", "items", index, "event", v)} />
              </div>
              <div className="mt-4"><Field label="Review" value={item.review} onChange={(v) => updateArray("testimonials", "items", index, "review", v)} multiline /></div>
            </div>
          ))}
          <button type="button" onClick={() => addItem("testimonials", "items", { name: "New Client", event: "Event", review: "" })} className="text-xs font-medium uppercase tracking-[0.12em] text-[#B68A35]">+ Add client story</button>
        </div>
      </SectionCard>

      <SectionCard eyebrow="INSTAGRAM" title="Instagram Strip">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.instagramStrip.eyebrow} onChange={(v) => update("instagramStrip", "eyebrow", v)} />
          <Field label="Handle / Label" value={content.instagramStrip.handle} onChange={(v) => update("instagramStrip", "handle", v)} hint="Use the public Instagram handle, e.g. @sterlingbloomdecor." />
          <Field label="Heading" value={content.instagramStrip.heading} onChange={(v) => update("instagramStrip", "heading", v)} />
          <Field label="Instagram URL" value={content.instagramStrip.url} onChange={(v) => update("instagramStrip", "url", v)} hint="Public profile URL, e.g. https://instagram.com/yourhandle" />
          <Field label="Button" value={content.instagramStrip.button} onChange={(v) => update("instagramStrip", "button", v)} />
        </div>
        <Field label="Description" value={content.instagramStrip.description} onChange={(v) => update("instagramStrip", "description", v)} multiline />
        <div className="space-y-4">
          {content.instagramStrip.items.map((item, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 bg-[#FBFAF7] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">Instagram Image {String(index + 1).padStart(2, "0")}</p>
                <button type="button" onClick={() => removeItem("instagramStrip", "items", index)} className="text-xs text-gray-400 hover:text-red-600">Remove</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <MediaPicker label="Image" value={item.image} onChange={(v) => updateArray("instagramStrip", "items", index, "image", v)} />
                <Field label="Alt Text" value={item.alt} onChange={(v) => updateArray("instagramStrip", "items", index, "alt", v)} />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addItem("instagramStrip", "items", { image: "", alt: "Sterling Bloom event" })} className="text-xs font-medium uppercase tracking-[0.12em] text-[#B68A35]">+ Add Instagram image</button>
        </div>
      </SectionCard>

      <SectionCard eyebrow="CONSULTATION" title="Calendly Booking">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.calendly.eyebrow} onChange={(v) => update("calendly", "eyebrow", v)} />
          <Field label="Heading" value={content.calendly.heading} onChange={(v) => update("calendly", "heading", v)} />
        </div>
        <Field label="Description" value={content.calendly.description} onChange={(v) => update("calendly", "description", v)} multiline />
        <p className="rounded-xl border border-[#D6B56D]/40 bg-[#FBF7ED] px-4 py-3 text-xs leading-5 text-gray-600">
          Calendly authentication stays server-side. The public booking page is loaded from your Calendly account after the Vercel environment variable is configured.
        </p>
      </SectionCard>

      <SectionCard eyebrow="CONTACT" title="Contact & Inquiry">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.contact.eyebrow} onChange={(v) => update("contact", "eyebrow", v)} />
          <Field label="Phone" value={content.contact.phone} onChange={(v) => update("contact", "phone", v)} />
          <Field label="Heading" value={content.contact.heading} onChange={(v) => update("contact", "heading", v)} />
          <Field label="Highlighted Heading" value={content.contact.highlight} onChange={(v) => update("contact", "highlight", v)} />
          <Field label="Email" value={content.contact.email} onChange={(v) => update("contact", "email", v)} />
          <Field label="Location" value={content.contact.location} onChange={(v) => update("contact", "location", v)} />
          <Field label="Hours" value={content.contact.hours || ""} onChange={(v) => update("contact", "hours", v)} />
          <Field label="Form Eyebrow" value={content.contact.formEyebrow} onChange={(v) => update("contact", "formEyebrow", v)} />
          <Field label="Form Heading" value={content.contact.formHeading} onChange={(v) => update("contact", "formHeading", v)} />
          <Field label="Form Button" value={content.contact.formButton} onChange={(v) => update("contact", "formButton", v)} />
        </div>
        <Field label="Description" value={content.contact.description} onChange={(v) => update("contact", "description", v)} multiline />
        <Field label="Consultation Note" value={content.contact.note} onChange={(v) => update("contact", "note", v)} />
        <Field label="Form Description" value={content.contact.formDescription} onChange={(v) => update("contact", "formDescription", v)} />
        <Field label="Form Footnote" value={content.contact.formFootnote} onChange={(v) => update("contact", "formFootnote", v)} />
        <MediaPicker label="Contact Background Image" value={content.contact.backgroundImage || ""} onChange={(v) => update("contact", "backgroundImage", v)} />
      </SectionCard>

      <SectionCard eyebrow="FOOTER" title="Footer">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Eyebrow" value={content.footer.eyebrow} onChange={(v) => update("footer", "eyebrow", v)} />
          <Field label="Closing Line" value={content.footer.closing} onChange={(v) => update("footer", "closing", v)} />
          <Field label="Heading" value={content.footer.heading} onChange={(v) => update("footer", "heading", v)} />
          <Field label="Highlighted Heading" value={content.footer.highlight} onChange={(v) => update("footer", "highlight", v)} />
          <Field label="Instagram Label" value={content.footer.instagram} onChange={(v) => update("footer", "instagram", v)} />
          <Field label="Instagram URL" value={content.footer.instagramHref} onChange={(v) => update("footer", "instagramHref", v)} hint="Full URL, for example https://instagram.com/yourhandle" />
          <Field label="Facebook Label" value={content.footer.facebook} onChange={(v) => update("footer", "facebook", v)} />
          <Field label="Facebook URL" value={content.footer.facebookHref} onChange={(v) => update("footer", "facebookHref", v)} hint="Full URL, for example https://facebook.com/yourpage" />
          <Field label="Location" value={content.footer.location} onChange={(v) => update("footer", "location", v)} />
          <Field label="Phone" value={content.footer.phone} onChange={(v) => update("footer", "phone", v)} />
          <Field label="Email" value={content.footer.email} onChange={(v) => update("footer", "email", v)} />
          <Field label="Button" value={content.footer.button} onChange={(v) => update("footer", "button", v)} />
          <Field label="Button Action" value={content.footer.buttonHref} onChange={(v) => update("footer", "buttonHref", v)} hint="Example: #contact, /consultation, or an external URL." />
        </div>
        <Field label="Description" value={content.footer.description} onChange={(v) => update("footer", "description", v)} multiline />
      </SectionCard>

      <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className={message.includes("successfully") ? "text-sm text-green-700" : "text-sm text-gray-500"}>{message || "Changes are local until you save them."}</p>
        <button type="button" onClick={save} disabled={saving} className="btn-primary shrink-0 rounded-xl px-7 py-3.5 text-xs uppercase tracking-[0.16em] disabled:opacity-60">
          {saving ? "Saving..." : "Save Website Content"}
        </button>
      </div>
    </div>
  );
}
