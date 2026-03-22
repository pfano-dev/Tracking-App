// /components/ui/Textarea.tsx
"use client";

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
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export function Select({ value, onChange, options, label }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      <select
        value={value}
        onChange={onChange}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
