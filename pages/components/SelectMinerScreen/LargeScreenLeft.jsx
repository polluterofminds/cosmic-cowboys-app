import React from "react";
import LeftCard from "../backgrounds/LeftCard";
import GradientHeading from "../Typography/GradientHeading";
import WelcomeLines from "../WelcomeLines";
import RightCard from "../backgrounds/RightCard";
import TabCard from "../backgrounds/TabCard";
import Card from "../backgrounds/Card";
import RightTab from "../tabs/RightTab";

const LargeScreenLeft = ({ miners, setSelectedMiner }) => {
  return (
    <div className="m-0 w-[40%] grow-0">
      <LeftCard customClasses="min-h-[60vh]">
        <div className="m-auto mt-10 w-[90%]">
          <div className="flex w-full items-center">
            <GradientHeading customClasses='font-sans text-4xl font-bold'>
              DASHBOARD
            </GradientHeading>
            <div className="w-full">
              <WelcomeLines />
            </div>
          </div>
          <div className="flex">
            <div className="mt-4 w-[90%] p-4">
              <Card customClasses="p-4">
                <p className="font-sans text-lg font-semibold text-white/60">
                  This is your terminal dashboard. Choose a miner to communicate
                  with. Just be aware, social flares interupt conversations
                  frequently and miners can be unruly and unpredictable.
                </p>
              </Card>
            </div>
            <div className="align-center mt-4 flex w-[10%] flex-col justify-center">
              <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
              <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
              <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
              <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
            </div>
          </div>
          <div className="flex">
            <div className="mt-4 w-[90%] p-4">
              <Card customClasses="p-4">
                <div className="no-scrollbar max-h-[30vh] overflow-scroll">
                  {miners.map((m) => {
                    return (
                      <div
                        aria-label="button"
                        onClick={() => setSelectedMiner(m)}
                        key={m.image}
                        className="align-center mb-2 flex h-12 w-full items-center cursor-pointer"
                      >
                        <img
                          src={`https://${
                            process.env.NEXT_PUBLIC_GATEWAY_URL
                          }/ipfs/${m.image.split("://")[1]}`}
                          alt={m.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <GradientHeading customClasses="h-8 ml-2 text-xl font-sans">
                          {m.name.toUpperCase()}
                        </GradientHeading>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
            <div className="align-center relative mt-20 h-full w-[10%] flex-col items-center justify-center">
              <div className="absolute -right-60 top-0 mt-0">
                <RightTab />
              </div>
              <div className="absolute -right-60 top-[40px] mt-0">
                <RightTab />
              </div>
              <div className="absolute -right-60 top-[80px]">
                <RightTab />
              </div>
              <div className="absolute -right-60 top-[120px]">
                <RightTab />
              </div>
              <div className="absolute -right-60 top-[160px] mt-0">
                <RightTab />
              </div>
            </div>
          </div>
        </div>
      </LeftCard>
    </div>
  );
};

export default LargeScreenLeft;
