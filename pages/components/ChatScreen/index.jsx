import React from "react";
import ChatLeftSide from "./ChatLeftSide";
import ChatRightSide from "./ChatRightSide";
import LeftCard from "../backgrounds/LeftCard";

const ChatScreen = ({
  setChatting,
  selectedMiner,
  sendMessage,
  address,
  messages,
  userInfo,
}) => {
  return (
    <div className="min-h-[65vh] pb-16 lg:pt-0 pt-32">
      {/* Large View */}
      <div className="hidden lg:block">
        <LeftCard customClasses="flex w-[85%] m-auto h-full mt-6 px-10 items-end justify-end">
          <ChatLeftSide
            selectedMiner={selectedMiner}
            setChatting={setChatting}
          />
          <ChatRightSide
            userInfo={userInfo}
            sendMessage={sendMessage}
            selectedMiner={selectedMiner}
            address={address}
            messages={messages}
          />
        </LeftCard>
      </div>
      {/* Mobile View */}
      <div className="-mt-48 lg:mt-0 lg:hidden">
        <div className="w-[85%] m-auto h-full lg:mt-6 px-0 lg:px-10">
          <ChatRightSide
            userInfo={userInfo}
            sendMessage={sendMessage}
            selectedMiner={selectedMiner}
            address={address}
            messages={messages}
          />
        </div>
        
          <ChatLeftSide
            selectedMiner={selectedMiner}
            setChatting={setChatting}
          />
        
      </div>
    </div>
  );
};

export default ChatScreen;
