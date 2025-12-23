'use client';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // get page title from url
  const parts = pathname.split('/').filter(Boolean);
  const title =
    parts.length > 1
      ? parts[parts.length - 1][0].toUpperCase() +
        parts[parts.length - 1].slice(1)
      : 'Dashboard';

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      {/* Left side */}
      <div>
        <p className="text-xs text-gray-400">
          Pages / <span className="text-gray-600">{title}</span>
        </p>
        <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg gap-2">
          <img src="/icons/search.png" alt="search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="Type here..."
            className="bg-transparent outline-none text-sm w-32 text-black"
          />
        </div>

        {/* Sign In */}
        <div className="flex items-center gap-1 cursor-pointer">
          <img src="/icons/user.png" alt="user" className="w-4 h-4" />
          <span className="text-sm text-gray-600">Sign In</span>
        </div>

        {/* Icons */}
        <img
          src="/icons/settings.png"
          alt="settings"
          className="w-4.5 h-4.5 cursor-pointer"
        />
        <img
          src="/icons/notification.png"
          alt="notification"
          className="w-4.5 h-4.5 cursor-pointer"
        />
      </div>
    </header>
  );
}
