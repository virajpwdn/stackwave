import Button from "../../Button";

const Title = ({ isMobile }) => {
  return (
    <div className="flex flex-col items-center justify-center px-10 pt-28 text-center">
      {isMobile ? (
        <h1 className="text-4xl font-bold">
          One Stop Solution for All Your Development Challenges
        </h1>
      ) : (
        <h1 className="text-5xl font-bold">
          One Stop Solution for All <br /> Your Development Challenges
        </h1>
      )}
      {isMobile ? (
        <p className="pt-5 text-center">
          Tired of juggling VS Code, Stack Overflow, ChatGPT, and Reddit for a{" "}
          single coding question? StackWave has you covered — all in one place.
        </p>
      ) : (
        <p className="pt-5 text-center">
          Tired of juggling VS Code, Stack Overflow, ChatGPT, and Reddit for a{" "}
          <br />
          single coding question? StackWave has you covered — all in one place.
        </p>
      )}
      <Button className={"mt-10 px-10"} size={"lg"}>
        Create Free Account
      </Button>
      <div className="mt-16 w-[450px] rounded-lg shadow-md md:w-[680px]">
        <img className="h-full w-full rounded-lg" src="/hero/title.png" />
      </div>
    </div>
  );
};

export default Title;
