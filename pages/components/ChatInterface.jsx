import React from "react";
import WelcomeLines from "./WelcomeLines";
import IntroWelcome from "./IntroWelcome";
import ChatLeftSide from "./ChatLeftSide";
import ChatRightSide from "./ChatRightSide";

const ChatInterface = ({ selectedMiner, setSelectedMiner, miners }) => {
  return (
      <div className="mt-32 h-auto bg-chat-body bg-no-repeat w-full">
        <div className="flex w-full px-10 pt-32">
          <ChatLeftSide
            selectedMiner={selectedMiner}
            miners={miners}
            setSelectedMiner={setSelectedMiner}
          />
          <ChatRightSide />
        </div>
      </div>
  );
};

export default ChatInterface;
