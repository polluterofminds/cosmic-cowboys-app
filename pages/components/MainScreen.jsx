import React from "react";
import SelectMinerScreen from "./SelectMinerScreen";
import Logo from "./Logo";
import ChatScreen from "./ChatScreen";

const MainScreen = ({
  chatting,
  miners,
  selectedMiner,
  selectMiner,
  logout,
  setChatting,
  startChatting,
  sendMessage,
  address,
  messages,
  userInfo,
  buyCreditsForNpc,
  displayHelp, 
  selectedTab,
  setSelectedTab
}) => {
  return (
    <div>
      <div className="-mt-8 lg:ml-0 -ml-4 flex w-full justify-between px-4 items-center">
        <Logo />
        <div className="mr-4 lg:relative absolute top-2 right-2">
          <button onClick={logout}>Disconnect</button>
        </div>
      </div>            
      {chatting ? (
        <ChatScreen
          miners={miners}
          setChatting={setChatting}
          selectedMiner={selectedMiner}
          selectMiner={selectMiner}
          sendMessage={sendMessage}
          address={address}
          messages={messages}
          userInfo={userInfo}
          buyCreditsForNpc={buyCreditsForNpc}
          displayHelp={displayHelp}
        />
      ) : (
        <SelectMinerScreen
          miners={miners}
          selectMiner={selectMiner}
          selectedMiner={selectedMiner}
          setChatting={setChatting}
          startChatting={startChatting}
          selectedTab={selectedTab} 
          setSelectedTab={setSelectedTab}
        />
      )}
    </div>
  );
};

export default MainScreen;
