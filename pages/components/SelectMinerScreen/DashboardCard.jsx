import React from "react";
import RightTab from "../tabs/RightTab";
import Card from "../backgrounds/Card";
import GradientHeading from "../Typography/GradientHeading";
import WelcomeLines from "../WelcomeLines";

const DashboardCard = ({ miners, selectMiner, handleSelect }) => {
  return (
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
            <p className="font-sans text-2xl font-semibold text-white/60">
              This is your terminal dashboard. Choose a miner to communicate
              with. Miners are sorted by credits as credits are the best
              indicator for success on Ganymede.
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
            <div className="no-scrollbar block max-h-[30vh] overflow-scroll lg:hidden">
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
            <div className="no-scrollbar hidden max-h-[30vh] overflow-scroll lg:block">
              <h1 className="mb-2 ml-2 h-6 font-sans text-2xl text-primary">
                MINERS
              </h1>
              {miners?.map((m) => {
                return (
                  <div
                    aria-label="button"
                    onClick={() => selectMiner(m)}
                    key={m?.image}
                    className="align-center mb-2 flex h-12 w-full cursor-pointer items-center hover:rounded-md hover:border hover:border-primary hover:bg-main hover:outline-primary"
                  >
                    <img
                      src={`https://${
                        process.env.NEXT_PUBLIC_GATEWAY_URL
                      }/ipfs/${m?.image?.split("://")[1]}`}
                      alt={m?.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <h3 className="ml-2 h-6 font-sans text-xl text-primary">
                        {m?.name?.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <div className="align-center relative mt-12 h-full w-[10%] flex-col items-center justify-center lg:mt-16">
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
  );
};

export default DashboardCard;
