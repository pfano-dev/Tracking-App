"use client";

import Link from "next/link";

type LinkButtonProps = {
  href: string;
  text: string;
  icon?: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger";
  fullWidth?: boolean;
};

const variants = {
  primary: "bg-blue-500 hover:bg-blue-600",
  success: "bg-green-500 hover:bg-green-600",
  warning: "bg-orange-500 hover:bg-orange-600",
  danger: "bg-red-500 hover:bg-red-600",
};

export default function LinkButton({
  href,
  text,
  icon,
  variant = "primary",
  fullWidth = false,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center justify-center
        px-4 py-2 rounded-xl
        text-white font-medium
        transition duration-200
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </Link>
  );
}
