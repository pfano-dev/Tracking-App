"use client";

import Link from "next/link";

type LinkButtonProps = {
  href: string;
  text: string;
  textColor?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger";
  fullWidth?: boolean;
};

const variants = {
  primary: "bg-blue-500 hover:bg-blue-600",
  success: "border border-orange-500 hover:bg-orange-300",
  warning: "bg-orange-500 hover:bg-orange-300",
  danger: "bg-red-500 hover:bg-red-600",
};

export default function LinkButton({
  href,
  text,
  icon,
  textColor = "text-white",
  variant = "primary",
  fullWidth = false,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center justify-center
        px-3 md:px-4 py-2 rounded-xl
        ${textColor}
        font-medium
        transition duration-200
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        gap-2
      `}
    >
      {icon && <span className="flex items-center">{icon}</span>}

      <span className="hidden md:inline">{text}</span>
    </Link>
  );
}
