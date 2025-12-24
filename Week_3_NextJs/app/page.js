import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-200">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 p-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/icons/logo.png"
              alt="logo"
              width={28}
              height={28}
              className="mr-3"
            />
            <h1 className="text-lg sm:text-xl font-bold">
              Purity UI Dashboard
            </h1>
          </Link>

          <div className="flex gap-3">
            <Link
              href="/about"
              className="rounded bg-gray-100 px-4 py-2 text-sm sm:text-base hover:bg-gray-200"
            >
              About Us
            </Link>
            <Link
              href="/signup"
              className="rounded bg-teal-600 px-4 py-2 text-sm sm:text-base text-white hover:bg-teal-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6 py-16 sm:py-20 text-center">
        <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold">
          Purity UI Dashboard
        </h1>
        <p className="mb-10 text-base sm:text-lg md:text-xl text-gray-600">
          We help you build your project quickly and easily. No complex tools,
          just simple code.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
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
      </main>

      {/* Features */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-4xl gap-8 px-6 sm:grid-cols-2 md:grid-cols-3 text-center">
          <div className="p-4">
            <h3 className="mb-2 text-lg font-bold">Fast</h3>
            <p className="text-gray-600">Loads instantly.</p>
          </div>
          <div className="p-4">
            <h3 className="mb-2 text-lg font-bold">Clean</h3>
            <p className="text-gray-600">Easy to read code.</p>
          </div>
          <div className="p-4">
            <h3 className="mb-2 text-lg font-bold">Open Source</h3>
            <p className="text-gray-600">Free to use forever.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="mx-auto max-w-6xl px-6 text-center text-xs sm:text-sm text-gray-500">
          © 2025 Purity UI Dashboard. Built with ❤️ by Anay.
        </div>
      </footer>
    </div>
  );
}
