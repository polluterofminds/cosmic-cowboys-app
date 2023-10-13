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
}) => {
  return (
    <div>
      <Logo />
      <div className="right-8 top-8 lg:fixed">
        <button onClick={logout}>Disconnect</button>
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
        />
      ) : (
        <SelectMinerScreen
          miners={miners}
          selectMiner={selectMiner}
          selectedMiner={selectedMiner}
          setChatting={setChatting}
          startChatting={startChatting}
        />
      )}
    </div>
  );
};

export default MainScreen;
