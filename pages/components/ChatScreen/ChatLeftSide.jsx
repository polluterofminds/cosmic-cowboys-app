import React from "react";
import Card from "../backgrounds/Card";
import GradientHeading from "../Typography/GradientHeading";
import ActivityFeed from "./ActivityFeed";

const ChatLeftSide = ({
  selectedMiner,
  miners,
  setSelectedMiner,
  setChatting,
  activity
}) => {
  const HudLines = () => {
    return (
      <>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
        <div className="align-center mt-2 flex items-center justify-evenly">
          <div className="h-4 w-4 rounded-full border border-primary" />
          <div className="h-3 w-14 rounded-lg bg-credits" />
          <div className="h-4 w-4 rounded-full border border-primary" />
        </div>
      </>
    );
  };
  return (
    <div className="mb-10 lg:w-2/5 w-full">
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
              <h1 className="font-supply text-xl font-bold text-primary">
                {selectedMiner?.name.toUpperCase()} (LIVE VIDEO)
              </h1>
              <div className="no-scrollbar mt-2">
                <div className="relative mt-2 hidden h-72 w-72 border border-primary lg:block">
                  <div className="crt absolute z-50 h-72 w-72" />
                  <img
                    className="absolute z-10 h-72 w-72 border border-b-primary border-l-primary border-r-primary border-t-transparent"
                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                      selectedMiner?.image?.split("://")[1]
                    }`}
                    alt="Radar"
                  />
                </div>
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

        <div className="mt-2 lg:w-auto w-1/2 flex m-auto">
          <div className="no-scrollbar lg:max-h-72 h-auto lg:w-[65%] w-[100%] overflow-scroll rounded-md border border-primary bg-mainBrown p-4">
            <h1 className="font-supply text-xl font-bold text-primary">
              ACTIVITY FEED
            </h1>
            <div>
              <ActivityFeed activity={activity} minerName={selectedMiner.name} />
            </div>
          </div>
          <div className="hidden lg:inline ml-2 mr-8 h-72 w-[35%] rounded-md border border-primary bg-mainBrown pt-4">
            <HudLines />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLeftSide;
