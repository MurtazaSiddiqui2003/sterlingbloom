import Image from "next/image";

export default function BrandLogo({ className = "", priority = false }) {
  return (
    <Image
      src="/images/sterling-bloom-logo.svg"
      alt="Sterling Bloom Design & Decor"
      width={220}
      height={64}
      priority={priority}
      className={className}
    />
  );
}
