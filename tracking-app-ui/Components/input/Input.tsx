// /components/ui/Textarea.tsx
"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type TextareaProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
};

type InputProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
};

export function Textarea({
  placeholder,
  value,
  onChange,
  label,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        className="px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-orange-300"
      />
    </div>
  );
}

export function Select({ value, onChange, options, label }: SelectProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full">
      {label && (
        <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      )}

      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 border rounded-lg bg-white text-left flex justify-between items-center"
      >
        <span>{selected?.label}</span>
        {!open ? <ChevronDown className="rotate-180" /> : <ChevronUp />}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white  rounded-lg shadow-lg">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                value === opt.value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Input({ placeholder, value, onChange, label }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-orange-300"
      />
    </div>
  );
}
