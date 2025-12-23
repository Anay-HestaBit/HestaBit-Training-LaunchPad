export default function StatCard({
  title,
  value,
  right,
  children,
  className = '',
}) {
  return (
    <div className="bg-white rounded-2xl px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          {title && <span className="text-sm text-gray-500">{title}</span>}

          {(value || children) && (
            <div className="flex items-center gap-2 mt-1">
              {value && (
                <p className="text-2xl font-semibold text-gray-800">{value}</p>
              )}
              {children}
            </div>
          )}
        </div>
        {right && (
          <div className="flex items-center justify-center w-14 h-14 rounded-xl">
            {right}
          </div>
        )}
      </div>
    </div>
  );
}
