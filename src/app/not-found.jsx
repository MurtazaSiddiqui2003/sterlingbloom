import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75svh] items-center justify-center bg-[#F8F7F4] px-5 py-24 text-center text-[#211D19]">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B68A35]">Sterling Bloom</p>
        <p className="mt-8 font-[family-name:var(--font-display)] text-8xl font-medium text-[#B68A35] sm:text-9xl">404</p>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-medium sm:text-4xl">This page has wandered off.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#66615B]">The link may be outdated, or the page may have moved. Let’s get you back to the celebrations.</p>
        <Link href="/" className="btn-primary mt-8 inline-flex px-7 py-3.5">Back to Home</Link>
      </div>
    </main>
  );
}
