import Link from 'next/link';
import Image from 'next/image';

export default function SignNav() {
  return (
    <div className="fixed top-4 left-1/2 z-50 w-[50%] -translate-x-1/2 rounded-xl bg-white px-8 py-5 opacity-90 shadow-md">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/icons/logo.png"
            alt="logo"
            width={25}
            height={25}
            className="mr-4"
          />
          <h1 className="text-l font-bold text-black">Purity UI Dashboard</h1>
        </Link>

        <nav className="flex items-center gap-8 text-xs font-semibold text-gray-700">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 transition hover:text-black"
          >
            <Image
              src="/signinPage/icons/cube.png"
              alt="dashboard"
              width={14}
              height={14}
            />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 transition hover:text-black"
          >
            <Image
              src="/signinPage/icons/user.png"
              alt="profile"
              width={14}
              height={14}
            />
            <span>Profile</span>
          </Link>

          <Link
            href="/signup"
            className="flex items-center gap-2 transition hover:text-black"
          >
            <Image
              src="/signinPage/icons/signup.png"
              alt="sign up"
              width={14}
              height={14}
            />
            <span>Sign Up</span>
          </Link>

          <Link
            href="/signin"
            className="flex items-center gap-2 transition hover:text-black"
          >
            <Image
              src="/signinPage/icons/signin.png"
              alt="sign in"
              width={14}
              height={14}
            />
            <span>Sign In</span>
          </Link>
        </nav>

        <button className="rounded-full bg-gray-900 px-8 py-2 text-s text-white">
          Free Download
        </button>
      </div>
    </div>
  );
}
