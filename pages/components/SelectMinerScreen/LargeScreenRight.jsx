import React from "react";
import LeftCard from "../backgrounds/LeftCard";
import GradientHeading from "../Typography/GradientHeading";
import WelcomeLines from "../WelcomeLines";
import RightCard from "../backgrounds/RightCard";
import TabCard from "../backgrounds/TabCard";
import Card from "../backgrounds/Card";
import RightTab from "../tabs/RightTab";
import LargeScreenLeft from "./LargeScreenLeft";
import Vitals from "./Vitals";

const LargeScreenRight = ({ miners, selectedMiner, setChatting, startChatting }) => {
  return (
    <div className="m-0 w-full lg:w-[60%]">
      <div>
        <Vitals selectedMiner={selectedMiner} />
        <RightCard customClasses="min-h-[70vh]">
          <div id="miner-bio" className="mt-4 p-6">
            <Card customClasses="p-6 min-h-[50vh] max-h-[70vh] overflow-scroll no-scrollbar">
              <div className="lg:flex items-start">
                <img
                  className="lg:h-20 lg:w-20 h-12 w-12 rounded-full"
                  src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                    selectedMiner.image.split("://")[1]
                  }`}
                  alt={selectedMiner.name}
                />
                <div className="w-full lg:ml-2">
                  <div className="align-center lg:flex items-center justify-between">
                    <GradientHeading customClasses="font-sans font-bold lg:text-4xl text-2xl ml-2">
                      {selectedMiner.name}
                    </GradientHeading>
                    <button
                      type="button"
                      onClick={startChatting}
                      className="hover:bg-grey-500 ml-2 mr-8 inline-flex items-center justify-center rounded-md bg-btnPrimary px-6 py-1 text-sm font-semibold text-white shadow-sm outline-none border border-primary"
                    >
                      <span className="text-xl">ENGAGE</span>
                    </button>
                  </div>
                  <div className="pre-wrap mt-6 lg:ml-2 lg:mr-10 text-white/60 font-semibold font-sans lg:text-xl text-lg">
                    {selectedMiner.description.split("\n").map((p, index) => {
                      return (
                        <p className="mb-2" key={index}>{p}</p>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </RightCard>
      </div>
    </div>
  );
};

export default LargeScreenRight;
