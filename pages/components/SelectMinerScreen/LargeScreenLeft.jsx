import React, { useRef } from "react";
import LeftCard from "../backgrounds/LeftCard";
import DashboardCard from "./DashboardCard";
import LeaderboardCard from "./LeaderboardCard";
import Map from "./Map";
import MobileMap from "./MobileMap";

const LargeScreenLeft = ({
  miners,
  selectMiner,
  selectedTab,
  setSelectedTab,
}) => {
  const handleSelect = (m) => {
    const element = document.getElementById("miner-bio");
    element.scrollTo();
    selectMiner(m);
  };
  return (
    <div className={selectedTab !== "map" ? "m-0 w-full grow-0 lg:w-[40%]" : "m-0 w-full grow-0 mt-20"}>
      <div className={selectedTab !== "map" ? "align-center flex w-full justify-center" : "align-left flex w-full justify-start ml-4"}>
        <div
          onClick={() => setSelectedTab("dashboard")}
          aria-label="button"
          className={
            selectedTab === "dashboard"
              ? "mr-1 cursor-pointer rounded-t-md border border-primary bg-primary px-2 lg:px-8 py-1 text-main"
              : "mr-1 cursor-pointer rounded-t-md border border-primary bg-mainBrown px-2 lg:px-8 py-1 text-primary"
          }
        >
          <h3 className="lg:text-lg text-md font-supply">DASHBOARD</h3>
        </div>
        <div
          onClick={() => setSelectedTab("leaderboard")}
          aria-label="button"
          className={
            selectedTab === "leaderboard"
              ? "mr-1 cursor-pointer rounded-t-md border border-primary bg-primary px-2 lg:px-8 py-1 text-main"
              : "mr-1 cursor-pointer rounded-t-md border border-primary bg-mainBrown px-2 lg:px-8 py-1 text-primary"
          }
        >
          <h3 className="lg:text-lg text-md font-supply">LEADERBOARD</h3>
        </div>
        <div
          onClick={() => setSelectedTab("map")}
          aria-label="button"
          className={
            selectedTab === "map"
              ? "cursor-pointer rounded-t-md border border-primary bg-primary px-2 lg:px-8 py-1 text-main"
              : "cursor-pointer rounded-t-md border border-primary bg-mainBrown px-2 lg:px-8 py-1 text-primary"
          }
        >
          <h3 className="lg:text-lg text-md font-supply">MAP</h3>
        </div>
      </div>
      <LeftCard customClasses="min-h-[60vh]">
        {selectedTab === "dashboard" ? (
          <DashboardCard handleSelect={handleSelect} miners={miners} selectMiner={selectMiner} />
        ) : selectedTab === "leaderboard" ? (
          <LeaderboardCard />
        ) : (
          <div>
            <div className="hidden md:block">
              <Map miners={miners} />
            </div>
            <div className="md:hidden">
              <MobileMap miners={miners} />
            </div>
          </div>
        )}
      </LeftCard>
    </div>
  );
};

export default LargeScreenLeft;
