import Image from "next/image";
import React from "react";

type BannerProps = {
  title: string;
  subtitle: string;
  image: string;
  height?: string; // Tailwind height class (e.g. "h-64", "h-[400px]")
  overlayClassName?: string;
  className?: string;
};

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  image,
  height = "h-64",
  overlayClassName = "bg-black/50",
}) => {
  return (
    <div
      className={`relative w-full ${height} flex items-center justify-center text-center text-white rounded-xl overflow-hidden`}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt="Banner Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClassName}`} />

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;
