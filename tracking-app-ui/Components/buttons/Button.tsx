"use client";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "success" | "danger" | "outline";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

const variants = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  success: "bg-orange-500 hover:bg-orange-300 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
};

export default function Button({
  text,
  onClick,
  icon,
  variant = "primary",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-xl font-medium
        transition duration-200
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {text}
    </button>
  );
}
