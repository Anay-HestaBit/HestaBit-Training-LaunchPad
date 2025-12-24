'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const parts = pathname.split('/').filter(Boolean);
  const title =
    parts.length > 1
      ? parts[parts.length - 1][0].toUpperCase() +
        parts[parts.length - 1].slice(1)
      : 'Dashboard';

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <p className="text-xs text-gray-400">
          Pages / <span className="text-gray-600">{title}</span>
        </p>
        <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5">
          <Image
            src="/icons/search.png"
            alt="search"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="Type here..."
            className="w-32 bg-transparent text-sm text-black outline-none"
          />
        </div>

        <div className="flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/user.png"
            alt="user"
            width={16}
            height={16}
          />
          <span className="text-sm text-gray-600">Sign In</span>
        </div>

        <Image
          src="/icons/settings.png"
          alt="settings"
          width={18}
          height={18}
          className="cursor-pointer"
        />
        <Image
          src="/icons/notification.png"
          alt="notification"
          width={18}
          height={18}
          className="cursor-pointer"
        />
      </div>
    </header>
  );
}
