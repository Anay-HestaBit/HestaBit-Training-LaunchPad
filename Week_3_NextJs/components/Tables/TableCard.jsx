import Image from 'next/image';

export default function TableCard({ columns, data }) {
  const gridTemplate = `3fr ${'1fr '.repeat(columns.length - 1)}`;

  return (
    <div className="mt-3">
      <div
        className="grid gap-x-10 border-b border-gray-300 pb-3 text-gray-400"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {columns.map((col) => (
          <span
            key={col}
            className={`text-xs font-semibold uppercase ${
              col === 'Actions' ? 'text-right' : ''
            }`}
          >
            {col !== 'Actions' ? col : ''}
          </span>
        ))}
      </div>

      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="ml-5 mt-3 grid items-center gap-x-10 border-b border-[#E2E8F0] pb-3 font-semibold text-[#2D3748]"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {columns.map((col) => {
            const cell = row[col];
            if (!cell) return null;

            if (cell.type === 'text') {
              return <span key={col}>{cell.value}</span>;
            }

            if (cell.type === 'image-text') {
              const isLogo = cell.value.variant === 'logo';

              return (
                <div key={col} className="flex items-center gap-3">
                  <Image
                    src={cell.value.image}
                    alt={cell.value.title}
                    width={isLogo ? 32 : 40}
                    height={isLogo ? 32 : 40}
                    className={
                      isLogo
                        ? 'object-contain'
                        : 'rounded-full object-cover'
                    }
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-black">
                      {cell.value.title}
                    </span>
                    {cell.value.subtitle && (
                      <span className="text-sm text-gray-400">
                        {cell.value.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              );
            }

            if (cell.type === 'badge') {
              const isOnline = cell.value === 'Online';

              return (
                <span
                  key={col}
                  className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                    isOnline
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {cell.value}
                </span>
              );
            }

            if (cell.type === 'progress') {
              return (
                <div key={col} className="w-full">
                  <span className="text-md text-teal-400">
                    {cell.value}%
                  </span>
                  <div className="mt-1 h-1 rounded bg-white">
                    <div
                      className="h-1 rounded bg-teal-400"
                      style={{ width: `${cell.value}%` }}
                    />
                  </div>
                </div>
              );
            }

            if (cell.type === 'action') {
              if (cell.value === 'dots') {
                return (
                  <button
                    key={col}
                    aria-label="row actions"
                    className="justify-self-end text-xl leading-none text-gray-400 hover:text-black"
                  >
                    ⋮
                  </button>
                );
              }

              if (cell.value === 'Edit') {
                return (
                  <button
                    key={col}
                    className="justify-self-end text-sm font-semibold text-gray-500 hover:text-black"
                  >
                    Edit
                  </button>
                );
              }
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
}
