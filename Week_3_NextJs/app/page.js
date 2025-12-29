import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center justify-center sm:justify-start"
          >
            <Image
              src="/icons/logo.png"
              alt="logo"
              width={28}
              height={28}
              className="mr-3"
            />
            <h1 className="text-lg font-bold">Purity UI Dashboard</h1>
          </Link>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/about"
              className="rounded bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 text-center"
            >
              About Us
            </Link>
            <Link
              href="/signup"
              className="rounded bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700 text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl text-center py-16 sm:py-24">
          <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Purity UI Dashboard
          </h1>

          <p className="mb-10 text-base sm:text-lg text-gray-600">
            We help you build your project quickly and easily. No complex tools,
            just simple code.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-teal-600 px-8 py-3 font-medium text-white hover:bg-teal-700"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-gray-300 px-8 py-3 font-medium hover:bg-gray-50"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-5xl px-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            { title: 'Fast', desc: 'Loads instantly.' },
            { title: 'Clean', desc: 'Easy to read code.' },
            { title: 'Open Source', desc: 'Free to use forever.' },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg bg-white p-6 text-center shadow-sm"
            >
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500">
          © 2025 Purity UI Dashboard. Built with ❤️ by Anay.
        </div>
      </footer>
    </div>
  );
}
