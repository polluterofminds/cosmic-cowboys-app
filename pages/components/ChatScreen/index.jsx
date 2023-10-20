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
  tellSecret,
  getAddressInfo
}) => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    loadActivity();
  }, [messages]);

  const loadActivity = async () => {
    try {
      const res = await fetch(
        `/api/chat/activity?npcId=${selectedMiner.tokenId}`
      );
      const json = await res.json();
      console.log(json);
      setActivity(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-16 pt-32 lg:pt-0">
      {/* Large View */}
      <div className="hidden lg:block">
        <button
          onClick={() => setChatting(false)}
          className="ml-12 relative inline-flex items-center justify-center gap-x-2 py-2.5 text-sm font-semibold text-white/60 outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span className="ml-2 mt-[3px] text-lg">BACK</span>
        </button>
        <LeftCard customClasses="flex w-[85%] m-auto h-full mt-6 px-10 items-center">
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
            getAddressInfo={getAddressInfo}
          />
        </LeftCard>
      </div>
      {/* Mobile View */}
      <div className="-mt-48 lg:mt-0 lg:hidden">
        <button
          onClick={() => setChatting(false)}
          className="relative inline-flex items-center justify-center gap-x-2 py-2.5 text-sm font-semibold text-white/60 outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span className="ml-2 mt-[3px] text-lg">BACK</span>
        </button>
        <div className="m-auto h-full w-[85%] px-0 lg:mt-6 lg:px-10">
          <ChatRightSide
            userInfo={userInfo}
            sendMessage={sendMessage}
            selectedMiner={selectedMiner}
            address={address}
            messages={messages}
            buyCreditsForNpc={buyCreditsForNpc}
            displayHelp={displayHelp}
            getAddressInfo={getAddressInfo}
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
