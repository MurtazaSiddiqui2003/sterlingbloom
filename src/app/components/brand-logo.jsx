import Image from "next/image";

export default function BrandLogo({ className = "", priority = false, style }) {
  const radius = style?.borderRadius ?? "inherit";

  return (
    <span
      style={{
        ...style,
        width: "100%",
        height: "100%",
        borderRadius: radius,
        overflow: "hidden",
        clipPath: `inset(0 round ${radius})`,
      }}
      className={"relative block " + className}
    >
      <Image
        src="/images/Sterling Bloom - Final Logo.svg"
        alt="Sterling Bloom"
        fill
        priority={priority}
        sizes="(max-width: 639px) 140px, 180px"
        style={{
          borderRadius: radius,
          clipPath: `inset(0 round ${radius})`,
        }}
        className="z-10 object-contain object-center drop-shadow-[0_2px_10px_rgba(29,24,19,0.28)]"
      />
    </span>
  );
}
