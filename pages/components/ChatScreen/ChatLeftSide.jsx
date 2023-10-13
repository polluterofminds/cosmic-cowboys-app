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
          className="inline-flex fixed lg:relative top-2 left-0 items-center justify-center gap-x-2 py-2.5 text-sm font-semibold text-white/60 outline-none"
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
        <div className="lg:flex hidden w-full">
          <Card customClasses="w-[90%]">
            <div className="p-6">
              <GradientHeading customClasses="text-3xl font-bold font-sans">
                {selectedMiner.name}
              </GradientHeading>
              <div className="no-scrollbar mt-2 max-h-[20vh] overflow-scroll">
                {selectedMiner.description.split("\n").map((p, index) => {
                  return (
                    <p className="mt-2 text-lg text-white/60" key={index}>
                      {p}
                    </p>
                  );
                })}
              </div>
            </div>
          </Card>
          <div className="align-center ml-2 mt-4 lg:flex hidden w-[10%] flex-col justify-center">
            <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
            <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
            <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
            <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
          </div>
        </div>
        <div className="mt-2 -ml-6 lg:flex hidden justify-between">
          <img className="h-72 w-72" src="/Radar.png" alt="Radar" />
          <img className="h-72 mr-8" src="/HUD.png" alt="Radar" />
        </div>
      </div>
    </div>
  );
};

export default ChatLeftSide;
