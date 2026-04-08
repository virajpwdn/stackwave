import { useNavigate } from "react-router";

import Button from "../../Button";

const HeroNav = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex max-w-[1440px] items-center justify-between px-10 py-10 md:px-36">
      <h1 className="text-2xl font-semibold uppercase tracking-wide">
        stackwave
      </h1>

      <nav className="hidden lg:block">
        <ul className="ml-10 flex gap-8 text-sm font-medium text-gray-600">
          <li>
            <a
              href="#features"
              className="transition-colors hover:text-gray-900"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="https://portfolio.virajpatwardhan.in"
              className="transition-colors hover:text-gray-900"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="https://portfolio.virajpatwardhan.in/projects/stackwave"
              className="transition-colors hover:text-gray-900"
            >
              About
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex gap-3">
        <Button
          onClick={() => navigate("/login")}
          variant="secondary"
          size="sm"
          className="px-8"
        >
          Login
        </Button>
        <Button
          onClick={() => navigate("/signup")}
          variant="primary"
          size="sm"
          className="px-8"
        >
          Signup
        </Button>
      </div>
    </div>
  );
};

export default HeroNav;
