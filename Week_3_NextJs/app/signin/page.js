'use-client';
import SignNav from '@/components/ui/SigninNav';
import Image from 'next/image';
export default function signin() {
  return (
    <div className="flex flex-col ">
      <main className="grid min-h-80vh grid-cols-1 lg:grid-cols-2">
        <SignNav></SignNav>
        <section className="flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <h1 className="mb-2 text-3xl font-bold text-teal-400">
              Welcome Back
            </h1>
            <p className="mb-6 text-sm text-gray-500">
              Enter your email and password to sign in
            </p>

            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-lg border text-gray-700 border-gray-200 px-4 py-2 focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  className="w-full rounded-lg border text-gray-700 border-gray-200 px-4 py-2 focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-teal-400 py-2 font-semibold text-white transition hover:opacity-90"
              >
                SIGN IN
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <a
                href="/signup"
                className="cursor-pointer font-semibold text-teal-400"
              >
                Sign up
              </a>
            </p>
          </div>
        </section>

        {/* RIGHT */}
        <section className="relative hidden lg:block ml-30">
          <Image
            src={'/signinPage/chakraImage.png'}
            width={872}
            height={862}
            alt="chakra"
          />
        </section>
      </main>
      <div className="mt-10">
        <footer className="flex flex-row justify-center ">
          <div>
            <span className="text-gray-400">
              @ 2021, Made with ❤️ by
              <span className="text-teal-400 font-semibold">
                {' '}
                Creative Anay{' '}
              </span>
              &<span className="text-teal-400 font-semibold">
                {' '}
                JOD Anay{' '}
              </span>{' '}
              for a better web
            </span>
          </div>
          <div className=" flex gap-20">
            <span className="text-gray-400">Creative Anay</span>
            <span className="text-gray-400"> JOD Anay</span>
            <span className="text-gray-400">Blog</span>
            <span className="text-gray-400">Licence </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
