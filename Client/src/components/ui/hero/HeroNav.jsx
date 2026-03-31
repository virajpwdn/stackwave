import Button from "../../Button";

const HeroNav = () => {
  return (
    <div className="flex justify-between">
      <div className="logo">
        <h1 className="text-2xl font-semibold uppercase">stackwave</h1>
      </div>
      <div className="cta flex gap-5">
        <Button
          size="sm"
          className={"bg-gray-200 px-8 text-[#000] hover:text-white"}
        >
          Login
        </Button>
        <Button className={"px-8"}>Signup</Button>
      </div>
    </div>
  );
};

export default HeroNav;
