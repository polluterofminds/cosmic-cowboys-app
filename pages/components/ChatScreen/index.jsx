import React, { useEffect, useState } from "react";
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
  buyCreditsForNpc,
  displayHelp, 
  tellSecret
}) => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    loadActivity();
  }, [messages]);

  const loadActivity = async () => {
    try {
      const res = await fetch(`/api/chat/activity?npcId=${selectedMiner.tokenId}`)
      const json = await res.json();
      console.log(json);
      setActivity(json);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-[65vh] pb-16 lg:pt-0 pt-32">
      {/* Large View */}
      <div className="hidden lg:block">
        <LeftCard customClasses="flex w-[85%] m-auto h-full mt-6 px-10 items-end justify-end">
          <ChatLeftSide
            selectedMiner={selectedMiner}
            setChatting={setChatting}
            activity={activity}
          />
          <ChatRightSide
            userInfo={userInfo}
            sendMessage={sendMessage}
            selectedMiner={selectedMiner}
            address={address}
            messages={messages}
            buyCreditsForNpc={buyCreditsForNpc}
            displayHelp={displayHelp}
            tellSecret={tellSecret}
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
            buyCreditsForNpc={buyCreditsForNpc}
            displayHelp={displayHelp}
          />
        </div>
        
          <ChatLeftSide
            selectedMiner={selectedMiner}
            setChatting={setChatting}
            activity={activity}
          />
        
      </div>
    </div>
  );
};

export default ChatScreen;
