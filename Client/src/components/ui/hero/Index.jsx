import { useEffect, useState } from "react";

import Details from "./Details";
import HeroNav from "./HeroNav";
import Title from "./Title";

const Index = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  const isMobile = screenWidth < 768;
  return (
    <div className="h-screen w-full overflow-x-hidden">
      <div className="bg-[#F6F8EB]">
        <HeroNav />
        <Title isMobile={isMobile} />
      </div>

      <Details isMobile={isMobile} />
    </div>
  );
};

export default Index;
