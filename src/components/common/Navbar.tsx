import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="navbar fixed top-0 z-10 bg-base-100">
      <div className="navbar-start">
        <div className="navbar-center">
          <a
            className="btn btn-ghost text-xl"
            href="https://www.trigify.io/"
            target="blank"
          >
            Trigify.io
          </a>
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
