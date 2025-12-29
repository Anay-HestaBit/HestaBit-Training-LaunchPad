import Image from 'next/image';

export default function TableCard({ columns, data }) {
  return (
    <div className="mt-3">
      <div
        className="grid gap-x-10 border-b border-gray-300 pb-3 text-gray-400"
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {columns.map((col) => (
          <span key={col} className="text-xs font-semibold uppercase">
            {col}
          </span>
        ))}
      </div>

      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="ml-5 mt-3 grid gap-x-10 border-b border-[#E2E8F0] pb-3 font-semibold text-[#2D3748]"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((col) => {
            const cell = row[col];

            if (cell.type === 'text') {
              return <span key={col}>{cell.value}</span>;
            }

            if (cell.type === 'image') {
              return (
                <Image
                  key={col}
                  src={cell.value}
                  alt={col}
                  width={104}
                  height={32}
                  className="rounded-full"
                />
              );
            }

            if (cell.type === 'image-text') {
              return (
                <div key={col} className="flex items-center gap-3">
                  <Image
                    src={cell.value.image}
                    alt={cell.value.text}
                    width={24}
                    height={24}
                  />
                  <span>{cell.value.text}</span>
                </div>
              );
            }

            if (cell.type === 'progress') {
              return (
                <div key={col} className="w-full">
                  <span className="text-md text-teal-400">{cell.value}%</span>
                  <div className="mt-1 h-1 rounded bg-white">
                    <div
                      className="h-1 rounded bg-teal-400"
                      style={{ width: `${cell.value}%` }}
                    />
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
}
