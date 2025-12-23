'use client';

export default function Button({ children, variant = 'primary', size = 'md' }) {
  const base = 'rounded-lg font-semibold transition';

  const variants = {
    primary: 'bg-teal-400 text-white hover:bg-teal-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
}
