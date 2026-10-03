import Image from "next/image";

export default function BrandLogo({ className = "", priority = false }) {
  return (
    <Image
      src="/images/Sterling Bloom - Final Logo.svg"
      alt="Sterling Bloom"
      width={1500}
      height={1500}
      priority={priority}
      className={className}
    />
  );
}
