import React from "react";
import LeftCard from "../backgrounds/LeftCard";
import GradientHeading from "../Typography/GradientHeading";
import WelcomeLines from "../WelcomeLines";
import RightCard from "../backgrounds/RightCard";
import TabCard from "../backgrounds/TabCard";
import Card from "../backgrounds/Card";
import RightTab from "../tabs/RightTab";
import LargeScreenLeft from "./LargeScreenLeft";
import LargeScreenRight from "./LargeScreenRight";

const SelectMinerScreen = ({ miners, setSelectedMiner, selectedMiner }) => {
  return (
    <div className="w-screen">
      <div className="m-auto hidden min-h-[90vh] w-[85%] items-end lg:flex">
        <LargeScreenLeft miners={miners} setSelectedMiner={setSelectedMiner} />
        <LargeScreenRight miners={miners} selectedMiner={selectedMiner} />
      </div>
    </div>
  );
};

export default SelectMinerScreen;
