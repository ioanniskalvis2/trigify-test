import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="navbar fixed top-0 z-10 bg-base-100">
      <div className="navbar-start">
        <div className="navbar-center">
          <Link
            className="btn btn-ghost text-xl"
            href="/"
            title="Go to home page"
          >
            Trigify.io
          </Link>
        </div>
      </div>

      <div className="navbar-end">
        {!user ? (
          <>
            <SignUpButton>
              <button className="btn btn-neutral">Sign Up</button>
            </SignUpButton>
            <div className="divider">or</div>
            <SignInButton>
              <button className="btn btn-neutral">Sign In</button>
            </SignInButton>
          </>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
