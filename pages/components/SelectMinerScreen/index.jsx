import React from "react";
import LargeScreenLeft from "./LargeScreenLeft";
import LargeScreenRight from "./LargeScreenRight";

const SelectMinerScreen = ({ miners, selectMiner, selectedMiner, setChatting, startChatting, selectedTab, setSelectedTab }) => {
  return (
    <div className="w-full lg:-mt-36 -mt-10">      
      <div className="m-auto hidden w-[85%] items-end lg:flex">
        <LargeScreenLeft miners={miners} selectMiner={selectMiner} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab !== "map" && <LargeScreenRight selectedTab={selectedTab} miners={miners} selectedMiner={selectedMiner} setChatting={setChatting} startChatting={startChatting} />}
      </div>

      <div className="m-auto lg:hidden w-[85%]">
        <LargeScreenLeft miners={miners} selectMiner={selectMiner} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab !== "map" && <LargeScreenRight selectedTab={selectedTab} miners={miners} selectedMiner={selectedMiner} setChatting={setChatting} startChatting={startChatting} />}
      </div>
    </div>
  );
};

export default SelectMinerScreen;
