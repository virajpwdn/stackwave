import Button from "../../Button";

const HeroNav = () => {
  return (
    <div className="flex items-center justify-between px-10 py-10 md:px-36 max-w-[1440px] mx-auto">
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
              href="#contact"
              className="transition-colors hover:text-gray-900"
            >
              Contact
            </a>
          </li>
          <li>
            <a href="#About" className="transition-colors hover:text-gray-900">
              About
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex gap-3">
        <Button variant="secondary" size="sm" className="px-8">
          Login
        </Button>
        <Button variant="primary" size="sm" className="px-8">
          Signup
        </Button>
      </div>
    </div>
  );
};

export default HeroNav;
