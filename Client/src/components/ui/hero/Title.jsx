import Button from "../../Button";

const Title = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-28 text-center">
      <h1 className="text-5xl font-bold">
        One Stop Solution for All <br /> Your Development Challenges
      </h1>
      <p className="pt-5 text-center">
        Tired of juggling VS Code, Stack Overflow, ChatGPT, and Reddit for a{" "}
        <br />
        single coding question? StackWave has you covered — all in one place.
      </p>
      <Button className={"mt-10 px-10"} size={"lg"}>
        Create Free Account
      </Button>
    </div>
  );
};

export default Title;
