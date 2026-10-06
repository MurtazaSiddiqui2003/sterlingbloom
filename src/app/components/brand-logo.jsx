import Image from "next/image";

export default function BrandLogo({ className = "", priority = false }) {
  return (
    <span
      className={
        "relative inline-block overflow-visible " +
        "before:absolute before:inset-[-10px] before:z-0 before:rounded-full " +
        "before:bg-[#f8f7f4]/55 before:blur-[10px] before:content-[''] " +
        className
      }
    >
      <Image
        src="/images/Sterling Bloom - Final Logo.svg"
        alt="Sterling Bloom"
        fill
        priority={priority}
        sizes="180px"
        className="relative z-10 object-contain object-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
      />
    </span>
  );
}
