const Details = ({ isMobile }) => {
  return (
    <div id="features" className="my-36 w-screen py-10">
      <h1 className="text-center text-4xl font-medium">What is StackWave?</h1>

      {/* details container */}
      <div className="flex flex-col-reverse items-center justify-center gap-10 px-10 py-20 md:flex-row md:gap-36">
        <div className="">
          <h2 className="text-3xl font-semibold">
            Real Time Code <br /> Colloboration
          </h2>
          <p className="max-w-80 pt-8 text-gray-700">
            A dedicated space for developers to ask questions, share code, and
            solve challenges together — instantly, with a community that grows
            with you.
          </p>
        </div>
        <div className="w-96">
          <img
            className="h-full w-full"
            src="/hero/codecollab.jpg"
            alt="code collab"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse items-center justify-center gap-10 bg-[#F5F5F5] px-10 py-20 md:flex-row-reverse">
        <div className="md:w-[400px]">
          <div>
            <h2 className="text-3xl font-semibold">AI Dockyuu Chat</h2>
            <p className="text-xs">
              Technologies used langgraph, langchain, vector database
            </p>
          </div>
          {isMobile ? (
            <p className="max-w-80 pt-8 text-sm text-gray-700">
              Your Documents, Now Smarter. Chat with Your Files Instantly.
            </p>
          ) : (
            <p className="max-w-80 pt-8 text-xl text-gray-700">
              Your Documents, Now Smarter.
              <br /> Chat with Your Files Instantly.
            </p>
          )}
        </div>
        <div className={`w-[600px] ${isMobile ? "w-[400px]" : "w-[600px]"}`}>
          <img
            className="h-full w-full"
            src="/hero/devrag1.png"
            alt="code collab"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse items-center justify-center gap-10 px-10 py-20 md:flex-row md:gap-36">
        <div className="">
          <h2 className="text-3xl font-semibold">Get AI Suggestion</h2>
          <p className="max-w-80 pt-8 text-gray-700">
            One Click. Instant AI Review. Better Code.
          </p>
        </div>
        <div className="w-96">
          <img
            className="h-full w-full"
            src="/hero/devai.jpg"
            alt="code collab"
          />
        </div>
      </div>

      <h1 className="mb-10 mt-32 text-center text-4xl font-medium">
        And more...
      </h1>
      <div className="p-6 md:p-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Section */}
          <div className="flex h-full flex-col justify-between rounded-2xl border p-5">
            <img
              src="/hero/devhelp.jpg"
              alt="Developers helping others"
              className="w-full rounded-xl object-cover"
            />
            <p className="mt-4 text-center text-xl font-semibold text-black md:text-2xl">
              Help others with their coding doubts
            </p>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Image */}
            <img
              src="/hero/devquestion.jpg"
              alt="Developers asking questions"
              className="h-full w-full rounded-2xl border object-cover"
            />

            {/* Ask Questions */}
            <div className="flex items-center justify-center rounded-2xl bg-[#0065F4] p-6">
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                Ask Questions
              </h3>
            </div>

            {/* Bottom Card */}
            <div className="col-span-full flex flex-col items-center gap-4 rounded-2xl bg-[#FFF1CF] px-5 max-md:py-10 sm:flex-row">
              <img
                src="/hero/devgrid.jpg"
                alt="Developers collaborating in real time"
                className="w-full rounded-xl object-cover sm:w-1/2"
              />
              <h3 className="text-xl font-semibold md:text-2xl">
                Code & Chat <br /> together in Real Time
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
