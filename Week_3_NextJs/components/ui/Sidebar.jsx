'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MAIN_NAV = [
  { name: 'Dashboard', path: '/dashboard', icon: '/icons/dashboard.png' },
  { name: 'Tables', path: '/tables', icon: '/icons/tables.png' },
  { name: 'Billing', path: '/billing', icon: '/icons/billing.png' },
  { name: 'RTL', path: '/rtl', icon: '/icons/RTL.png' },
];

const ACCOUNT_NAV = [
  { name: 'Profile', path: '/dashboard/profile', icon: '/icons/profile.png' },
  { name: 'Sign In', path: '/signin', icon: '/icons/signin.png' },
  { name: 'Sign Up', path: '/signup', icon: '/icons/signup.png' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 bg-white border-r px-6 py-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <a href="/">
          <img src="/icons/logo.png" alt="logo" className="w-6 h-5 ml-2" />
        </a>
        <a href="/">
          <span className="text-m font-semibold text-gray-800 p-5">
            PURITY UI DASHBOARD
          </span>
        </a>
      </div>
      <div className="flex-1">
        <ul className="space-y-2">
          {MAIN_NAV.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              active={pathname === item.path}
            />
          ))}
        </ul>

        <p className="text-xs font-semibold text-gray-400 mt-6 mb-2">
          ACCOUNT PAGES
        </p>

        <ul className="space-y-2">
          {ACCOUNT_NAV.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              active={pathname === item.path}
            />
          ))}
        </ul>
        <div className="bg-teal-400 rounded-xl p-4 text-white mt-6">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-teal-400 font-bold">?</span>
          </div>

          <p className="mt-3 font-semibold">Need help?</p>
          <p className="text-sm opacity-100">Please check our docs</p>

          <button className="mt-4 bg-white text-teal-500 w-full py-2 rounded-lg text-sm font-semibold">
            DOCUMENTATION
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item, active }) {
  return (
    <Link href={item.path}>
      <li
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
          ${
            active
              ? 'bg-teal-200 text-gray-900 font-semibold'
              : 'text-gray-500 hover:text-teal-400 hover:bg-teal-100'
          }
        `}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center
            ${active ? 'bg-teal-100' : 'bg-gray-100'}
          `}
        >
          <img src={item.icon} alt={item.name} className="w-4 h-4" />
        </div>

        <span className="text-sm">{item.name}</span>
      </li>
    </Link>
  );
}
