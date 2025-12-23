export default function Badge({ text, color = 'gray' }) {
  const colors = {
    gray: 'bg-gray-100 text-gray-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[color]}`}
    >
      {text}
    </span>
  );
}
