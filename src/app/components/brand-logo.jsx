import Image from "next/image";

export default function BrandLogo({ className = "", priority = false }) {
  return (
    <span className={"relative inline-block overflow-hidden " + className}>
      <Image
        src="/images/Sterling Bloom - Final Logo.svg"
        alt="Sterling Bloom"
        fill
        priority={priority}
        sizes="180px"
        className="object-contain object-center scale-[1.64]"
      />
    </span>
  );
}
