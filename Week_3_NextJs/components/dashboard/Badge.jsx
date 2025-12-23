export default function Badge({ text, color = 'gray' }) {
  const colors = {
    gray: ' text-gray-500',
    green: ' text-green-500',
    red: ' text-red-500',
    blue: ' text-blue-500',
  };

  return (
    <span className={`py-2 text-sm font-semibold ${colors[color]}`}>
      {text}
    </span>
  );
}
