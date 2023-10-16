import React from "react";
import Card from "../backgrounds/Card";
import GradientHeading from "../Typography/GradientHeading";

const ChatLeftSide = ({
  selectedMiner,
  miners,
  setSelectedMiner,
  setChatting,
}) => {
  return (
    <div className="mb-10 w-2/5">
      <div className="p-4">
        <button
          onClick={() => setChatting(false)}
          className="fixed left-0 top-2 inline-flex items-center justify-center gap-x-2 py-2.5 text-sm font-semibold text-white/60 outline-none lg:relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span className="ml-2 mt-[3px] text-lg">BACK</span>
        </button>
        <div className="hidden w-full lg:flex">
          <Card customClasses="w-[90%]">
            <div className="p-6">
              <GradientHeading customClasses="text-3xl font-bold font-sans">
                {selectedMiner?.name}
              </GradientHeading>
              <div className="no-scrollbar mt-2 max-h-[20vh] overflow-scroll">
                {selectedMiner?.description?.split("\n").map((p, index) => {
                  return (
                    <p className="mt-2 text-lg text-white/60" key={index}>
                      {p}
                    </p>
                  );
                })}
              </div>
            </div>
          </Card>
          <div className="align-center ml-2 mt-4 hidden w-[10%] flex-col justify-center lg:flex">
            <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
            <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
            <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
            <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
          </div>
        </div>
        <div className="mt-2 h-72 w-72 ml-8 relative hidden lg:block">
          <div className="h-72 w-72 absolute z-50 crt" />
          <img className="h-72 w-72 absolute z-10" src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${selectedMiner.image.split("://")[1]}`} alt="Radar" />
          {/* <img className="mr-8 h-72" src="/HUD.png" alt="Radar" /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatLeftSide;
