import Badge from '@/components/dashboard/Badge';
import Button from '@/components/ui/Button';
import StatCard from '@/components/dashboard/StatCard';
import BottomSmallCard from '@/components/dashboard/BottomSmallCard';
import ListCard from '@/components/dashboard/ListCard';
import { data } from '@/components/data/projectsdata';
export const projectColumns = ['Companies', 'Members', 'Budget', 'Completion'];
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-8">
        <StatCard
          title="Today's Money"
          value="$53,000"
          right={<img className="w-16 h-14" src="/icons/money.png" />}
        >
          <Badge text="+55%" color="green" />
        </StatCard>

        <StatCard
          title="Today's Users"
          value="2,300"
          right={<img className="w-16 h-14" src="/icons/users.png" />}
        >
          <Badge text="+5%" color="green" />
        </StatCard>

        <StatCard
          title="New Clients"
          value="+3,052"
          right={<img className="w-16 h-14" src="/icons/clients.png" />}
        >
          <Badge text="-14%" color="red" />
        </StatCard>

        <StatCard
          title="Total Sales"
          value="$173,000"
          right={<img className="w-16 h-14" src="/icons/sales.png" />}
        >
          <Badge text="+8%" color="green" />
        </StatCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
        <StatCard>
          <div className="flex justify-between gap-35 min-h-55">
            <div className="flex flex-col justify-between">
              <div className="max-w-sm">
                <span className="text-sm text-gray-400">
                  Built by developers
                </span>
                <h2 className="text-xl font-bold text-gray-800 mt-1">
                  Purity UI Dashboard
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  From colors, StatCards, typography to complex elements, you
                  will find the full documentation.
                </p>
              </div>
              <a
                className="flex items-center gap-1 text-sm font-medium text-black"
                href=""
              >
                Read more →
              </a>
            </div>
            <div className="w-100 rounded-xl overflow-hidden">
              <img
                src="/dashboardCardImages/chakra.png"
                alt="chakra"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </StatCard>
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="relative min-h-65 rounded-xl overflow-hidden">
            <img
              src="/dashboardCardImages/Background.svg"
              alt="team"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
              <div className="max-w-lg">
                <h2 className="text-2xl font-bold">Work with the Rockets</h2>

                <p className="mt-3 text-base opacity-90 leading-relaxed">
                  Wealth creation is an evolutionarily recent positive-sum game.
                  It is all about who take the opportunity first.
                </p>
              </div>
              <a className="text-sm  text-white font-medium mt-30" href="">
                Read more →
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-6">
        <div className="flex flex-col shadow-xl rounded-2xl px-5 py-5">
          <div className="w-full h-55 overflow-hidden rounded-xl">
            <img
              src="/dashboardCardImages/graph2.png"
              alt="graph"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="py-5">
            <h1 className="text-black text-xl font-semibold">Active Users</h1>
            <span className="text-green-500 font-semibold"> (+23) </span>
            <span className="text-gray-400">than last week</span>
          </div>
          <div className="flex items-center justify-between gap-5">
            <BottomSmallCard
              name={'Users'}
              img={'/icons/smallUser.png'}
              value={'32,984'}
            ></BottomSmallCard>
            <BottomSmallCard
              name={'Clicks'}
              img={'/icons/rocket.png'}
              value={'2,42m'}
            ></BottomSmallCard>
            <BottomSmallCard
              name={'Sales'}
              img={'/icons/sales.png'}
              value={'2,400$'}
            ></BottomSmallCard>
            <BottomSmallCard
              name={'Items'}
              img={'/icons/items.png'}
              value={'320'}
            ></BottomSmallCard>
          </div>
        </div>
        {/* right card */}
        <StatCard>
          <div className="min-h-98 px-1  flex flex-col gap-5">
            <div>
              <h1 className="text-black text-xl font-semibold">
                Sales Overview
              </h1>
              <span className="text-green-500 font-semibold">(+5%) more </span>
              <span className="text-gray-400">in 2021</span>
            </div>
            <div className="flex-1 overflow-hidden rounded-xl py-2">
              <img
                src="/dashboardCardImages/graph.png"
                alt="graph"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </StatCard>
      </div>
      <div className="grid grid-cols-[66%_34%] gap-5 rounded-2xl p-1 mt-8">
        <ListCard
          title="Projects"
          subtitle={'30 done this month'}
          columns={projectColumns}
          data={data}
        />
        <div className="shadow-lg flex flex-1 rounded-2xl">
          <img
            src="/dashboardCardImages/secondCrad.png"
            className="p-1 h-full w-full"
          ></img>
        </div>
      </div>
      <footer className="flex flex-row justify-between">
        <div>
          <span className="text-gray-400">
            @ 2021, Made with ❤️ by
            <span className="text-teal-400 font-semibold"> Creative Anay </span>
            &<span className="text-teal-400 font-semibold"> JOD Anay </span> for
            a better web
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
  );
}
function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}
