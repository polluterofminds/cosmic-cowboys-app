import Image from "next/image";
import React, { useState } from "react";
import GradientHeading from "../Typography/GradientHeading";

const MobileMap = ({ miners }) => {  
  const [hover, setHover] = useState(false);
  const [hoverMiner, setHoverMiner] = useState("");

  const handleHover = (m) => {
    setHover(true);
    setHoverMiner(m)
  }

  const handleMouseLeave = () => {
    setHover(false);
    setHoverMiner("");
  }

  return (
    <div className="no-scrollbar relative min-h-[60vh] overflow-scroll">
      <div className="absolute top-10 z-10 h-[164px] w-[300px]">
        <img src="/map.png" className="h-[164px] w-[300px]" />
        <div className="absolute left-[60px] top-[20px] z-50">
          <div className="flex -space-x-2 overflow-hidden">
            {miners
              .filter((m) => m.currentLocation === "Supply Depot")
              .map((m, index) => {
                return (
                  <div className="cursor-pointer relative" onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleHover(m.name)} key={index}>
                  <img
                    className="inline-block h-4 w-4 rounded-full"
                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                      m.image.split("://")[1]
                    }`}
                    alt=""
                  />
                  {
                    hover && hoverMiner === m.name &&
                    <p className="bg-mainBrown border border-primary rounded-md p-4 text-white/60 fixed">{m.name}</p>
                  }
                  </div>
                );
              })}
          </div>
        </div>
        <div className="z-60 absolute left-[75px] top-[75px]">
          <div className="flex -space-x-2 overflow-hidden">
            {miners
              .filter((m) => m.currentLocation === "Home")
              .map((m, index) => {
                return (
                  <div className="cursor-pointer" onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleHover(m.name)} key={index}>
                  <img
                    className="inline-block h-4 w-4 rounded-full"
                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                      m.image.split("://")[1]
                    }`}
                    alt=""
                  />
                  {
                    hover && hoverMiner === m.name &&
                    <p className="bg-mainBrown border border-primary rounded-md p-4 text-white/60 fixed">{m.name}</p>
                  }
                  </div>
                );
              })}
          </div>
        </div>

        <div className="z-60 absolute left-[110px] top-[110px]">
          <div className="flex -space-x-2 overflow-hidden relative">
            {miners
              .filter((m) => m.currentLocation === "Bar")
              .map((m, index) => {
                return (
                  <div className="cursor-pointer relative" onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleHover(m.name)} key={index}>
                  <img
                    className="inline-block h-4 w-4 rounded-full"
                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                      m.image.split("://")[1]
                    }`}
                    alt=""
                  />
                  {
                    hover && hoverMiner === m.name &&
                    <p className="bg-mainBrown border border-primary rounded-md p-4 text-white/60 fixed">{m.name}</p>
                  }
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-2">
        <GradientHeading customClasses={"text-5xl font-supply"}>GANYMEDE</GradientHeading>
      </div>
    </div>
  );
};

export default MobileMap;
