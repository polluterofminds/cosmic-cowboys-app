import React from "react";
import GradientHeading from "../Typography/GradientHeading";
import WelcomeLines from "../WelcomeLines";
import TabCard from "../backgrounds/TabCard";

const Vitals = ({ selectedMiner }) => {
  const getVitals = (vital) => {
    switch (vital) {
      case "health":
        const health = selectedMiner?.health;
        const maxHealth = selectedMiner?.maxHealth;
        const healthArray = [];
        let count = 0;
        while (count < health) {
          healthArray.push({ full: true });
          count++;
        }
        count = 0;
        while (count < maxHealth - health) {
          healthArray.push({ full: false });
          count++;
        }
        return (
          <>
            {healthArray.map((h, index) => {
              return (
                <div
                  key={index}
                  className={
                    h.full
                      ? "pill-full h-2 w-4 rounded-lg"
                      : "h-2 w-4 rounded-lg border border-primary"
                  }
                ></div>
              );
            })}
          </>
        );
      case "food":
        let foodCount = 0;
        const foodArray = [];

        while (foodCount < selectedMiner?.food) {
          foodArray.push({ full: true });
          foodCount++;
        }
        return (
          <>
            {foodArray.map((h, index) => {
              return (
                <div
                  key={index}
                  className={
                    h.full
                      ? "pill-full h-2 w-4 rounded-lg"
                      : "h-2 w-4 rounded-lg border border-primary"
                  }
                ></div>
              );
            })}
          </>
        );
      case "supplies": 
        let supplyCount = 0;
        const supplyArray = [];

        while (supplyCount < selectedMiner?.food) {
          supplyArray.push({ full: true });
          supplyCount++;
        }
        return (
          <>
            {supplyArray.map((h, index) => {
              return (
                <div
                  key={index}
                  className={
                    h.full
                      ? "pill-full h-2 w-4 rounded-lg"
                      : "h-2 w-4 rounded-lg border border-primary"
                  }
                ></div>
              );
            })}
          </>
        );
      case "credits": 
          return (
            <p className="text-3xl text-credits -mb-[11px]">{selectedMiner?.credits}<span className="text-xl ml-2">🪙</span></p>
          )
      default:
        return [];
    }
  };
  return (
    <TabCard customClasses="lg:mx-[6.75rem] m-auto lg:mb-0 lg:mt-0 mb-2 mt-4 bg-mainBrown">
      <div className="m-auto w-[90%]">
        <div className="align-center flex items-center">
          <GradientHeading customClasses="text-4xl">VITALS</GradientHeading>
          <div className="w-full">
            <WelcomeLines />
          </div>
        </div>
        <div className="flex justify-around">
          <div>
            <div className="grid grid-flow-col grid-rows-6 gap-2">
              {getVitals("health")}
            </div>
            <GradientHeading customClasses="font-sans text-md">
              Health
            </GradientHeading>
          </div>
          <div>
            <div className="grid grid-flow-col grid-rows-6 gap-2">
              {getVitals("food")}
            </div>
            <GradientHeading customClasses="font-sans text-md">
              Food
            </GradientHeading>
          </div>
          <div>
            <div className="grid grid-flow-col grid-rows-6 gap-2">
              {getVitals("supplies")}
            </div>
            <GradientHeading customClasses="font-sans text-md">
              Supplies
            </GradientHeading>
          </div>
          <div>
          <div className="">
              {getVitals("credits")}
            </div>
            <GradientHeading customClasses="font-sans text-md">
              Credits
            </GradientHeading>
          </div>
        </div>
      </div>
    </TabCard>
  );
};

export default Vitals;
