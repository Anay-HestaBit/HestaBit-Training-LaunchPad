import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* NAVBAR */}
      <nav className="p-6 flex items-center justify-between border-b border-gray-200">
        <div className="text-xl font-bold text-black flex">
          <a href="/">
            <img src="/icons/logo.png" className="h-7 w-7 ml-5 mr-5"></img>
          </a>
          <a href="/">
            <h1> Purity UI Dashboard</h1>
          </a>
        </div>
        <div className="flex gap-4">
          {/* Button to go to About Page */}
          <Link
            href="/about"
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            About Us
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Purity UI Dashboard</h1>
        <p className="text-xl text-gray-600 mb-10">
          We help you build your project quickly and easily. No complex tools,
          just simple code.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 bg-teal-600 text-white rounded-lg font-medium">
            Get Started
          </button>
          <Link
            href="/dashboard"
            className="px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
          >
            View Dashboard
          </Link>
        </div>
      </main>

      {/* SIMPLE FEATURES */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Fast</h3>
            <p className="text-gray-600">Loads instantly.</p>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Clean</h3>
            <p className="text-gray-600">Easy to read code.</p>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Open Source</h3>
            <p className="text-gray-600">Free to use forever.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        Created by a Developer © 2025
      </footer>
    </div>
  );
}
