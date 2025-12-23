'use client';

export default function Input({ placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-teal-400"
    />
  );
}
