const Bottom = ({ isMobile }) => {
  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center gap-20 p-10">
        <h1 className="text-center text-4xl">Watch Analytics</h1>
        <img src="/hero/analytics.jpg" alt="analytics" />
      </div>

      {/* footer */}
      <div className="relative mt-32 h-[90%] w-full">
        <img
          src="/hero/abstract.png"
          className="h-full w-full object-cover"
          alt="abstract"
        />
        <div className="absolute top-1/3 p-10 px-10 md:px-40">
          {isMobile ? (
            <>
              <h1 className="font-serif text-2xl font-bold text-gray-500">
                Grow and upskill yourself with every questions asked.
              </h1>
              <h1 className="font-serif text-2xl font-bold">
                Only faster. And effortless.
              </h1>
            </>
          ) : (
            <>
              <h1 className="font-serif text-5xl font-bold text-gray-500">
                Grow and upskill yourself <br /> with every questions asked.{" "}
                <br />
              </h1>
              <h1 className="font-serif text-5xl font-bold">
                Only faster. And effortless.
              </h1>
            </>
          )}
          <button className="mt-10 rounded-lg bg-[#0065F4] px-6 py-2 text-white">
            Create Free Account
          </button>
        </div>
        <p className="absolute bottom-4 w-full text-center">
          © StackWave 2026 – All Rights Reserved
        </p>
      </div>
    </div>
  );
};
export default Bottom;
