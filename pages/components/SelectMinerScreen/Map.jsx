import Image from "next/image";
import React, { useState } from "react";
import GradientHeading from "../Typography/GradientHeading";

const Map = ({ miners }) => {
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
      <div className="absolute -top-4 left-[150px] z-10 h-[492px] w-[900px]">
        <img src="/map.png" className="h-[492px] w-[900px]" />
        <div className="absolute left-[260px] top-[112px] z-50">
          <div className="flex -space-x-2 overflow-hidden">
            {miners?.filter((m) => m?.currentLocation === "Supply Depot")?.map((m, index) => {
                return (
                  <div className="cursor-pointer relative" onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleHover(m.name)} key={index}>
                  <img
                    className="inline-block h-6 w-6 rounded-full"
                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                      m?.image?.split("://")[1]
                    }`}
                    alt=""
                  />
                  {
                    hover && hoverMiner === m?.name &&
                    <p className="bg-mainBrown border border-primary rounded-md p-4 text-white/60 fixed">{m?.name}</p>
                  }
                  </div>
                );
              })}
          </div>
        </div>
        <div className="z-60 absolute left-[245px] top-[247px]">
          <div className="flex -space-x-2 overflow-hidden">
            {miners
              ?.filter((m) => m?.currentLocation === "Home")
              ?.map((m, index) => {
                return (
                  <div className="cursor-pointer" onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleHover(m?.name)} key={index}>
                  <img
                    className="inline-block h-6 w-6 rounded-full"
                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                      m?.image?.split("://")[1]
                    }`}
                    alt=""
                  />
                  {
                    hover && hoverMiner === m?.name &&
                    <p className="bg-mainBrown border border-primary rounded-md p-4 text-white/60 fixed">{m?.name}</p>
                  }
                  </div>
                );
              })}
          </div>
        </div>

        <div className="z-60 absolute left-[450px] top-[337px]">
          <div className="flex -space-x-2 overflow-hidden relative">
            {miners
              ?.filter((m) => m?.currentLocation === "Bar")
              ?.map((m, index) => {
                return (
                  <div className="cursor-pointer relative" onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleHover(m?.name)} key={index}>
                  <img
                    className="inline-block h-6 w-6 rounded-full"
                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                      m?.image?.split("://")[1]
                    }`}
                    alt=""
                  />
                  {
                    hover && hoverMiner === m?.name &&
                    <p className="bg-mainBrown border border-primary rounded-md p-4 text-white/60 fixed">{m?.name}</p>
                  }
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-2 lg:right-6 lg:bottom-10">
        <GradientHeading customClasses={"lg:text-5xl text-3xl font-supply"}>GANYMEDE</GradientHeading>
      </div>
    </div>
  );
};

export default Map;
