import Image from 'next/image';
import Badge from '@/components/dashboard/Badge';
import Button from '@/components/ui/Button';
import StatCard from '@/components/dashboard/StatCard';
import BottomSmallCard from '@/components/dashboard/BottomSmallCard';
import ListCard from '@/components/dashboard/ListCard';
import { data } from '@/components/data/Dashboard/projectsData';

export const projectColumns = ['Companies', 'Members', 'Budget', 'Completion'];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-8">
        <StatCard
          title="Today's Money"
          value="$53,000"
          right={
            <Image src="/icons/money.png" alt="money" width={64} height={56} />
          }
        >
          <Badge text="+55%" color="green" />
        </StatCard>

        <StatCard
          title="Today's Users"
          value="2,300"
          right={
            <Image src="/icons/users.png" alt="users" width={64} height={56} />
          }
        >
          <Badge text="+5%" color="green" />
        </StatCard>

        <StatCard
          title="New Clients"
          value="+3,052"
          right={
            <Image src="/icons/clients.png" alt="clients" width={64} height={56} />
          }
        >
          <Badge text="-14%" color="red" />
        </StatCard>

        <StatCard
          title="Total Sales"
          value="$173,000"
          right={
            <Image src="/icons/sales.png" alt="sales" width={64} height={56} />
          }
        >
          <Badge text="+8%" color="green" />
        </StatCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
        <StatCard>
          <div className="flex justify-between min-h-55">
            <div className="flex flex-col justify-between">
              <div className="max-w-sm">
                <span className="text-sm text-gray-400">
                  Built by developers
                </span>
                <h2 className="mt-1 text-xl font-bold text-gray-800">
                  Purity UI Dashboard
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  From colors, StatCards, typography to complex elements, you
                  will find the full documentation.
                </p>
              </div>
              <a className="flex items-center gap-9 text-sm font-semibold  text-black">
                Read more →
              </a>
            </div>
            <div className="relative w-100 overflow-hidden rounded-xl ml-25 top-5">
              <Image
                src="/dashboardCardImages/chakra.png"
                alt="chakra"
                width={350}
                height={300}
              />
            </div>
          </div>
        </StatCard>

        <div className="rounded-2xl bg-white p-4 shadow-lg">
          <div className="relative min-h-65 overflow-hidden rounded-xl">
            <Image
              src="/dashboardCardImages/Background.svg"
              alt="team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
              <div className="max-w-lg">
                <h2 className="text-2xl font-bold">Work with the Rockets</h2>
                <p className="mt-3 text-base leading-relaxed opacity-90">
                  Wealth creation is an evolutionarily recent positive-sum game.
                  It is all about who take the opportunity first.
                </p>
              </div>
              <a className="mt-30 text-sm font-medium text-white">
                Read more →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-6">
        <div className="flex flex-col rounded-2xl px-5 py-5 shadow-xl">
          <div className="relative h-55 w-full overflow-hidden rounded-xl">
            <Image
              src="/dashboardCardImages/graph2.png"
              alt="graph"
              fill
              className="object-cover"
            />
          </div>
          <div className="py-5">
            <h1 className="text-xl font-semibold text-black">Active Users</h1>
            <span className="font-semibold text-green-500"> (+23) </span>
            <span className="text-gray-400">than last week</span>
          </div>
          <div className="flex items-center justify-between gap-5">
            <BottomSmallCard name="Users" img="/icons/smallUser.png" value="32,984" />
            <BottomSmallCard name="Clicks" img="/icons/rocket.png" value="2,42m" />
            <BottomSmallCard name="Sales" img="/icons/sales.png" value="2,400$" />
            <BottomSmallCard name="Items" img="/icons/items.png" value="320" />
          </div>
        </div>

        <StatCard>
          <div className="flex min-h-98 flex-col gap-5 px-1">
            <div>
              <h1 className="text-xl font-semibold text-black">
                Sales Overview
              </h1>
              <span className="font-semibold text-green-500">(+5%) more </span>
              <span className="text-gray-400">in 2021</span>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-xl py-2">
              <Image
                src="/dashboardCardImages/graph.png"
                alt="graph"
                width={883}
                height={296}
              />
            </div>
          </div>
        </StatCard>
      </div>

      <div className="mt-8 grid grid-cols-[66%_34%] gap-5 rounded-2xl p-1">
        <ListCard
          title="Projects"
          subtitle="✅ 30 done this month"
          columns={projectColumns}
          data={data}
        />
        <div className="relative flex flex-1 rounded-2xl shadow-lg">
          <Image
            src="/dashboardCardImages/secondCrad.png"
            alt="card"
            fill
            className="rounded-2xl object-cover p-1"
          />
        </div>
      </div>

      <footer className="flex justify-between">
        <span className="text-gray-400">
          © 2021, Made with ❤️ by
          <span className="font-semibold text-teal-400"> Creative Anay </span>&
          <span className="font-semibold text-teal-400"> JOD Anay </span>
          for a better web
        </span>
        <div className="flex gap-20 text-gray-400">
          <span>Creative Anay</span>
          <span>JOD Anay</span>
          <span>Blog</span>
          <span>Licence</span>
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
