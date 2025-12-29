'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import AuthLayout from '@/components/layouts/AuthLayout';
import DashboardLayout from '../components/layouts/DashboardLayout';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith('/signin') ||
    pathname.startsWith('/signup') ||
    pathname.endsWith('/') ||
    pathname.startsWith('/about');

  return (
    <html lang="en">
      <body className="bg-gray-100">
        {isAuthPage ? (
          <AuthLayout>{children}</AuthLayout>
        ) : (
          <DashboardLayout>{children}</DashboardLayout>
        )}
      </body>
    </html>
  );
}
