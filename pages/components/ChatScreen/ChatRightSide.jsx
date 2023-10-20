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
  displayHelp,
  tellSecret,
  getAddressInfo,
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
      case "--tell-secret":
        await tellSecret();
        setNewMessage("");
        break;
      case "--wallet":
        await getAddressInfo();
        setNewMessage("");
        break;
      default:
        sendMessage(newMessage);
        setNewMessage("");
        break;
    }
  };
  return (
    <div className="w-full lg:w-3/5">
      <div className="rounded-lg border border-primary bg-terminal lg:ml-4">
        <div className="align-end m-auto flex max-h-[60vh] min-h-[15vh] flex-col justify-end">
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
                className="ml-2 w-full bg-terminal text-[#FFCC00] outline-none"
                placeholder="Try to reach your miner..."
                autoFocus={true}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRightSide;
