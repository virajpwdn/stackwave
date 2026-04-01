const Details = ({ isMobile }) => {
  return (
    <div className="my-36 w-screen py-10">
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
    </div>
  );
};
export default Details;
