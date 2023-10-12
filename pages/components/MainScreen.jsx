import React from "react";
import SelectMinerScreen from "./SelectMinerScreen";
import Logo from "./Logo";
import ChatScreen from "./ChatScreen";

const MainScreen = ({ chatting, miners, selectedMiner, setSelectedMiner, logout, setChatting }) => {
  return (
    <div>
      <Logo />
      <div className="lg:fixed right-8 top-8">
        <button onClick={logout}>Disconnect</button>
      </div>
      {chatting ? (
        <ChatScreen
          miners={miners}
          setChatting={setChatting}
          selectedMiner={selectedMiner}
          setSelectedMiner={setSelectedMiner}
        />
      ) : (
        <SelectMinerScreen
          miners={miners}
          setSelectedMiner={setSelectedMiner}
          selectedMiner={selectedMiner}
          setChatting={setChatting}
        />
      )}
    </div>
  );
};

export default MainScreen;
