import SignUpNav from '@/components/ui/SignupNav';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <>
      <div className="bg-white p-5">
        <div className="relative flex h-[520px] w-full justify-center">
          <SignUpNav />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4 mb-25">
            <h1 className="text-4xl font-bold mb-3">Welcome!</h1>
            <p className="max-w-md text-sm opacity-1-0">
              Use these awesome forms to login or create new account in your
              project for free.
            </p>
          </div>
          <Image
            src="/signupPage/Background.svg"
            alt="background"
            width={1920}
            height={520}
            className="h-full w-full object-cover z-0"
            priority
          />
        </div>

        <div className="relative z-20 -mt-[200px] flex justify-center">
          <div className="flex h-auto w-full max-w-[450px] flex-col items-center rounded-2xl bg-white px-8 py-12 text-black shadow-xl md:w-[450px]">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Register with
            </h3>

            <ul className="mb-6 flex gap-[15px]">
              <li>
                <Image
                  src="/signupPage/socials/facebook.png"
                  alt="facebook"
                  width={75}
                  height={75}
                />
              </li>
              <li>
                <Image
                  src="/signupPage/socials/apple.png"
                  alt="apple"
                  width={75}
                  height={75}
                />
              </li>
              <li>
                <Image
                  src="/signupPage/socials/google.png"
                  alt="google"
                  width={75}
                  height={75}
                />
              </li>
            </ul>

            <span className="mb-6 text-sm font-semibold text-gray-400">OR</span>

            <form className="w-full space-y-5">
              <div>
                <label className="mb-1 block text-sm text-black">Name</label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-black">Email</label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-black">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-teal-400 py-2.5 font-semibold text-white transition hover:opacity-90"
              >
                SIGN UP
              </button>
            </form>
            <p className="mt-10 text-sm font-semibold text-gray-400">
              Already have an account?
              <a href="/signin" className="text-teal-400">
                {' '}
                Sign in{' '}
              </a>
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-[60px] flex flex-col items-center justify-center gap-y-4 pb-[15px] md:flex-row md:justify-evenly">
        <p className="text-center text-[#A0AEC0]">
          © 2021, Made with ❤️ by{' '}
          <span className="text-green-400">Creative Anay</span> &{' '}
          <span className="text-green-400">Jod Anay</span> for a better web
        </p>

        <ul className="flex flex-wrap justify-center gap-[15px] text-center text-[#A0AEC0]">
          <li>Creative Anay</li>
          <li>Jod Anay</li>
          <li>Blog</li>
          <li>License</li>
        </ul>
      </footer>
    </>
  );
}
