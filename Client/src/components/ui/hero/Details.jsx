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

      <h1 className="text-center text-4xl font-medium">And more...</h1>
      <div className="bg-red-500">
  <div className="grid grid-cols-2 justify-center gap-6">
    {/* justify-content: center pulls both columns toward the middle */}
    <div className="col-span-1 row-span-2 rounded-2xl bg-[#D9D9D9] p-5 h-full place-self-end">
      <img
        src="/hero/devhelp.jpg"
        alt="devlopers guide"
        className="w-[400px] rounded-2xl"
      />
      <p className="mb-8 mt-2 text-2xl font-semibold text-black">
        Help others with their coding doubts
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6 place-self-start">
      <img
        src="/hero/devquestion.jpg"
        className="col-span-1 w-[300px] border border-black rounded-2xl"
        alt=""
      />
      <div className="flex items-center justify-center rounded-2xl bg-[#0065F4]">
        <h3 className="text-3xl font-semibold">Ask Questions</h3>
      </div>
      <div className="col-span-2 flex items-center gap-10 rounded-2xl bg-[#FFF1CF]">
        <img
          className="w-[300px] rounded-2xl"
          src="/hero/devgrid.jpg"
          alt="dev question"
        />
        <h3 className="text-2xl font-semibold">
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
