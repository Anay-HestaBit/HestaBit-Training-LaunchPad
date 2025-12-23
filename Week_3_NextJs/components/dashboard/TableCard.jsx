export default function TableCard({ columns, data }) {
  return (
    <div className="mt-3">
      {/* Header */}
      <div
        className="grid gap-x-10 border-b border-gray-300 pb-3 text-gray-400"
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {columns.map((col) => (
          <span key={col} className="uppercase text-xs font-semibold">
            {col}
          </span>
        ))}
      </div>

      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-x-10 text-[#2D3748] font-semibold ml-5 mt-3 border-b border-[#E2E8F0] pb-3"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((col) => {
            const cell = row[col];

            if (cell.type === 'text') {
              return <span key={col}>{cell.value}</span>;
            }

            if (cell.type === 'image') {
              return (
                <img
                  key={col}
                  src={cell.value}
                  className="w-26 h-8 rounded-full"
                />
              );
            }

            if (cell.type === 'image-text') {
              return (
                <div key={col} className="flex items-center gap-3">
                  <img src={cell.value.image} className="w-6 h-6" />
                  <span>{cell.value.text}</span>
                </div>
              );
            }

            if (cell.type === 'progress') {
              return (
                <div key={col} className="w-full">
                  <span className="text-md text-teal-400">{cell.value}%</span>
                  <div className="h-1 bg-white rounded mt-1">
                    <div
                      className="h-1 bg-teal-400 rounded"
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
