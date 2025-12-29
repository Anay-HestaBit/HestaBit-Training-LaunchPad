import InnerCard from '@/components/profile/InnerCard.jsx';
import ProfileCard from '@/components/profile/ProfileCard.jsx';

export default function profile() {
  return (
    <div>
      <div className="border-2 border-pink-500 h-[377.5px] w-[1510px] l-[298px] t-[397px] rounded-xl shadow-xl flex gap-5">
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
      <div className=" h-[540px] w-[1520px] l-[298px] t-[798.5px] mt-5 rounded-xl shadow-xl ">
        <div className="flex flex-col mt-8 ml-5">
          <h1 className="font-extrabold text-black text-2xl">Projects</h1>
          <p className="text-gray-500 mt-3">Architects design houses</p>
        </div>
        <div className="flex  mt-5">
          <InnerCard
            name={'Modern'}
            Project={'Project #1'}
            img={'/profilePage/kitchen.png'}
          />
          <InnerCard
            name={'Scandinavian'}
            Project={'Project #2'}
            img={'/profilePage/plant1.png'}
          />
          <InnerCard
            name={'Minimalist'}
            Project={'Project #3'}
            img={'/profilePage/plant2.png'}
          />
          <div className="text-black h-[390px] w-[365px] t-[902.5px] l-[319px] ml-3 mr-3 mt-5 border-2 border-[#E0E1E2] rounded-3xl flex flex-col justify-center transition-transform transition-200 hover:-translate-y-2">
            <div className="flex flex-col items-center">
              <img
                src="/profilePage/outline.png"
                alt=""
                className="h-[30px] w-[30px] l-[1674px] t-[1043px] font-extrabold"
              />
              <h1 className="font-extrabold text-2xl text-[#718096]">
                Create a New Project
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <footer className="flex flex-row justify-between ">
          <div>
            <span className="text-gray-400">
              @ 2021, Made with ❤️ by
              <span className="text-teal-400 font-semibold">
                {' '}
                Creative Anay{' '}
              </span>
              &<span className="text-teal-400 font-semibold">
                {' '}
                JOD Anay{' '}
              </span>{' '}
              for a better web
            </span>
          </div>
          <div className=" flex gap-20">
            <span className="text-gray-400">Creative Anay</span>
            <span className="text-gray-400"> JOD Anay</span>
            <span className="text-gray-400">Blog</span>
            <span className="text-gray-400">Licence </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
