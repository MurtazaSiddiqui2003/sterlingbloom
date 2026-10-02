import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/admin-auth";
import MediaLibrary from "./media-library";

export default async function AdminMediaPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#211d19]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <div>
            <Link href="/admin" className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#B68A35]">← Admin Portal</Link>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-medium">Media Library</h1>
          </div>
          <Link href="/admin/content" className="rounded-[10px] border border-gray-200 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-gray-600 hover:border-[#B68A35] hover:text-[#B68A35]">Website Content</Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <p className="eyebrow">MEDIA</p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium sm:text-5xl">Your visual library.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
          Upload event photography and video to Cloudinary, then use those assets across the Sterling Bloom website.
        </p>
        <div className="mt-8"><MediaLibrary /></div>
      </div>
    </main>
  );
}
