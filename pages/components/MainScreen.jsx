import React from "react";
import ChatInterface from "./ChatInterface";
import SelectMinerScreen from "./SelectMinerScreen";
import Logo from "./Logo";

const MainScreen = ({ chatting, miners, selectedMiner, setSelectedMiner }) => {
  return (
    <div>
      <Logo />
      {chatting ? (
        <ChatInterface
          miners={miners}
          selectedMiner={selectedMiner}
          setSelectedMiner={setSelectedMiner}
        />
      ) : (
        <SelectMinerScreen
          miners={miners}
          setSelectedMiner={setSelectedMiner}
          selectedMiner={selectedMiner}
        />
      )}
    </div>
  );
};

export default MainScreen;
