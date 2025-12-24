'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <aside className="flex w-80 flex-col border-r bg-white px-6 py-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Image
          src="/icons/logo.png"
          alt="logo"
          width={24}
          height={20}
          className="ml-2"
        />
        <span className="p-5 text-m font-semibold text-gray-800">
          PURITY UI DASHBOARD
        </span>
      </Link>

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

        <p className="mb-2 mt-6 text-xs font-semibold text-gray-400">
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

        <div className="mt-6 rounded-xl bg-teal-400 p-4 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <span className="font-bold text-teal-400">?</span>
          </div>

          <p className="mt-3 font-semibold">Need help?</p>
          <p className="text-sm opacity-100">Please check our docs</p>

          <button className="mt-4 w-full rounded-lg bg-white py-2 text-sm font-semibold text-teal-500">
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
        className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 ${
          active
            ? 'bg-teal-200 font-semibold text-gray-900'
            : 'text-gray-500 hover:bg-teal-100 hover:text-teal-400'
        }`}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            active ? 'bg-teal-100' : 'bg-gray-100'
          }`}
        >
          <Image
            src={item.icon}
            alt={item.name}
            width={16}
            height={16}
          />
        </div>
        <span className="text-sm">{item.name}</span>
      </li>
    </Link>
  );
}
