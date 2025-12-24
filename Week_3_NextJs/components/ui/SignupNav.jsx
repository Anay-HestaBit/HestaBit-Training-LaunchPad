import Link from 'next/link';
import Image from 'next/image';

export default function SignUpNav() {
  return (
    <div className=" fixed top-8 left-1/2 z-50 w-[50%] -translate-x-1/2 rounded-xl  px-5 py-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/icons/logoWhite.png"
            alt="logo"
            width={25}
            height={25}
            className="mr-4"
          />
          <h1 className="text-l font-bold text-white">Purity UI Dashboard</h1>
        </Link>

        <nav className="flex items-center gap-8 text-xs font-semibold text-white">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 transition hover:text-white "
          >
            <Image
              src="/signupPage/icons/cube.png"
              alt="dashboard"
              width={14}
              height={14}
            />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 transition hover:text-white"
          >
            <Image
              src="/signupPage/icons/user.png"
              alt="profile"
              width={14}
              height={14}
            />
            <span>Profile</span>
          </Link>

          <Link
            href="/signup"
            className="flex items-center gap-2 transition hover:text-white"
          >
            <Image
              src="/signupPage/icons/signup.png"
              alt="sign up"
              width={14}
              height={14}
            />
            <span>Sign Up</span>
          </Link>

          <Link
            href="/signin"
            className="flex items-center gap-2 transition hover:text-white"
          >
            <Image
              src="/signupPage/icons/signin.png"
              alt="sign in"
              width={14}
              height={14}
            />
            <span>Sign In</span>
          </Link>
        </nav>

        <button className="rounded-full bg-white px-8 py-2 text-xs text-black">
          Free Download
        </button>
      </div>
    </div>
  );
}
