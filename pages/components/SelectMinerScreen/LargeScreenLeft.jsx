import React, { useRef } from "react";
import LeftCard from "../backgrounds/LeftCard";
import GradientHeading from "../Typography/GradientHeading";
import WelcomeLines from "../WelcomeLines";
import RightCard from "../backgrounds/RightCard";
import TabCard from "../backgrounds/TabCard";
import Card from "../backgrounds/Card";
import RightTab from "../tabs/RightTab";

const LargeScreenLeft = ({ miners, selectMiner }) => {
  const handleSelect = (m) => {
    const element = document.getElementById("miner-bio");
    element.scrollTo()
    selectMiner(m);
  }
  return (
    <div className="m-0 w-full grow-0 lg:w-[40%]">
      <LeftCard customClasses="min-h-[60vh]">
        <div className="m-auto mt-10 w-[90%]">
          <div className="flex w-full items-center">
            <GradientHeading customClasses="font-sans text-4xl font-bold">
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
                {/* Mobile View */}
                <div className="lg:hidden block no-scrollbar max-h-[30vh] overflow-scroll">
                  {miners?.map((m) => {
                    return (
                      <div
                        aria-label="button"
                        onClick={() => handleSelect(m)}
                        key={m?.image}
                        className="align-center mb-2 flex h-12 w-full cursor-pointer items-center"
                      >
                        <img
                          src={`https://${
                            process.env.NEXT_PUBLIC_GATEWAY_URL
                          }/ipfs/${m?.image?.split("://")[1]}`}
                          alt={m?.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <GradientHeading customClasses="h-8 ml-2 text-xl font-sans">
                          {m?.name?.toUpperCase()}
                        </GradientHeading>
                      </div>
                    );
                  })}
                </div>
                {/* Large View */}
                <div className="hidden lg:block no-scrollbar max-h-[30vh] overflow-scroll">
                  {miners?.map((m) => {
                    return (
                      <div
                        aria-label="button"
                        onClick={() => selectMiner(m)}
                        key={m?.image}
                        className="align-center mb-2 flex h-12 w-full cursor-pointer items-center"
                      >
                        <img
                          src={`https://${
                            process.env.NEXT_PUBLIC_GATEWAY_URL
                          }/ipfs/${m?.image?.split("://")[1]}`}
                          alt={m?.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <GradientHeading customClasses="h-8 ml-2 text-xl font-sans">
                          {m?.name?.toUpperCase()}
                        </GradientHeading>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
            <div className="align-center relative mt-12 lg:mt-16 h-full w-[10%] flex-col items-center justify-center">
              <div className="-right-100 absolute top-0 mt-0 lg:-right-60">
                <RightTab />
              </div>
              <div className="-right-100 absolute top-[40px] mt-0 lg:-right-60">
                <RightTab />
              </div>
              <div className="-right-100 absolute top-[80px] lg:-right-60">
                <RightTab />
              </div>
              <div className="-right-100 absolute top-[120px] lg:-right-60">
                <RightTab />
              </div>
              <div className="-right-100 absolute top-[160px] mt-0 lg:-right-60">
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
