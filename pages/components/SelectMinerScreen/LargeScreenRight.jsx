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

const LargeScreenRight = ({ miners, selectedMiner, setChatting }) => {
  return (
    <div className="m-0 w-[60%]">
      <div>
        <Vitals selectedMiner={selectedMiner} />
        <RightCard customClasses="min-h-[70vh]">
          <div className="mt-4 p-6">
            <Card customClasses="p-6 min-h-[50vh] max-h-[70vh] overflow-scroll no-scrollbar">
              <div className="flex items-start justify-start">
                <img
                  className="h-20 w-20 rounded-full"
                  src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                    selectedMiner.image.split("://")[1]
                  }`}
                  alt={selectedMiner.name}
                />
                <div className="w-full ml-2">
                  <div className="align-center flex items-center justify-between">
                    <GradientHeading customClasses="font-sans font-bold text-4xl ml-2">
                      {selectedMiner.name}
                    </GradientHeading>
                    <button
                      type="button"
                      onClick={() => setChatting(true)}
                      className="hover:bg-grey-500 ml-2 mr-8 inline-flex items-center justify-center rounded-md bg-btnPrimary px-6 py-1 text-sm font-semibold text-white shadow-sm outline-none border border-primary"
                    >
                      <span className="text-xl">ENGAGE</span>
                    </button>
                  </div>
                  <div className="pre-wrap mt-6 ml-2 mr-10 text-white/60 font-semibold font-sans text-xl">
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
