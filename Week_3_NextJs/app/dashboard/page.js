import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-8">
        <Card
          title="Today's Money"
          value="$53,000"
          right={<img className="w-16 h-14" src="/icons/money.png" />}
        >
          <Badge text="+55%" color="green" />
        </Card>

        <Card
          title="Today's Users"
          value="2,300"
          right={<img className="w-16 h-14" src="/icons/users.png" />}
        >
          <Badge text="+5%" color="green" />
        </Card>

        <Card
          title="New Clients"
          value="+3,052"
          right={<img className="w-16 h-14" src="/icons/clients.png" />}
        >
          <Badge text="-14%" color="red" />
        </Card>

        <Card
          title="Total Sales"
          value="$173,000"
          right={<img className="w-16 h-14" src="/icons/sales.png" />}
        >
          <Badge text="+8%" color="green" />
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
        <Card>
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
                  From colors, cards, typography to complex elements, you will
                  find the full documentation.
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
                src="/chakra.png"
                alt="chakra"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
        <div className="bg-white rounded-2xl shadow-lg p-4">
          {/* Inner container (this is what the image fills) */}
          <div className="relative min-h-65 rounded-xl overflow-hidden">
            {/* Image fills INNER container */}
            <img
              src="/Background.svg"
              alt="team"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

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
    </div>
  );
}

/* Small stat block */
function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}
