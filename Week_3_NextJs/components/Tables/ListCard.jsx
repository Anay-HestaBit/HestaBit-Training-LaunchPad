import TableCard from './TableCard';
export default function ListCard({ title, subtitle, columns, data }) {
  return (
    <>
      <div className="flex flex-col px-4 py-4 rounded-2xl shadow-lg mt-5 ">
        <div className="flex flex-col px-2 py-2">
          <h1 className="text-black font-bold text-2xl">{title}</h1>
          <span className="text-gray-400 font-semibold text-sm py-1">{subtitle}</span>
        </div>

        <TableCard columns={columns} data={data} />
      </div>
    </>
  );
}
