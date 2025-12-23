import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* NAVBAR (Same style, but button goes Home) */}
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
          {/* Button changed to Home */}
          <Link
            href="/"
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Back Home
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ABOUT CONTENT */}
      <main className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-teal-600">About Us</h1>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            Welcome to Purity. We are a small team of developers who believe
            that software should be simple and easy to understand.
          </p>

          <p>
            We noticed that most dashboard templates are too complicated. They
            include hundreds of features that beginners never use. We wanted to
            change that.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">
            Our Mission
          </h2>
          <p>
            Our mission is to provide clean, readable code that anyone can pick
            up and start using immediately. Whether you are a student or a pro,
            Purity is designed for you.
          </p>
        </div>

        <div className="mt-12 p-6 bg-teal-50 rounded-xl border border-teal-100">
          <h3 className="font-bold mb-2">Contact Us</h3>
          <p className="text-gray-600">
            Have questions? Email us at hello@purity.com
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-gray-100">
        Created by a Developer © 2025
      </footer>
    </div>
  );
}
