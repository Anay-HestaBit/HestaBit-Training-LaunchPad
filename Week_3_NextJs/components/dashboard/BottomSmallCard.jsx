export default function BottomSmallCard({ name, img, value }) {
  return (
    <div className="flex flex-col h-[65.5px] w-30 rounded-xl mt-8 mb-4">
      <div className="flex items-center">
        <img src={img} alt="" className="h-10 w-10 " />
        <span className=" text-md text-gray-500 ">{name}</span>
      </div>
      <div>
        <span className="text-black font-semibold text-xl">{value}</span>
        <img src="/icons/progress.png" alt="progress" className="w-25" />
      </div>
    </div>
  );
}
