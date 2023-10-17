import React, { useState } from "react";
import Messages from "./Messages";
import RocketIcon from "../RocketIcon";

const ChatRightSide = ({
  messages,
  sendMessage,
  address,
  selectedMiner,
  userInfo,
  buyCreditsForNpc,
  displayHelp
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = async () => {
    switch (newMessage) {
      case "--help":
        displayHelp();
        setNewMessage("");
        break;
      case "--donate":
        //  Buy credits for NPC
        await buyCreditsForNpc();
        setNewMessage("");
        break;
      //  Clear message
      default:
        sendMessage(newMessage);
        setNewMessage("");
        break;
    }
  };
  return (
    <div className="h-full w-full lg:w-3/5">
      <div className="mt-6 rounded-lg border border-primary bg-mainBrown lg:mb-20 lg:ml-4">
        <div className="flex max-h-[85%] min-h-[65vh] flex-col justify-end">
          <Messages
            userInfo={userInfo}
            messages={messages}
            address={address}
            selectedMiner={selectedMiner}
          />
          <div className="h-full">
            <div className="flex px-4 pb-4">
              <p className="text-[#FFCC00]">Me: </p>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="ml-2 w-full bg-mainBrown text-[#FFCC00] outline-none"
                placeholder="Try to reach your miner..."
                autoFocus={true}
                onKeyDown={handleKeyDown}
              />
              {/* <button
                type="button"
                onClick={handleSend}
                className="hover:bg-grey-500 ml-2 inline-flex w-1/4 items-center justify-center gap-x-2 rounded-md bg-btnPrimary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm outline-none"
              >
                <RocketIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                <span className="text-2xl">SEND</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRightSide;
