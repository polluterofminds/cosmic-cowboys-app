import React from "react";
import WelcomeLines from "./WelcomeLines";
import IntroBody from "./IntroBody";

const ChatLeftSide = ({ selectedMiner, miners, setSelectedMiner }) => {
  return (
    <div className="w-4/5 mb-10">
      <div className="align-center mb-2 flex h-auto flex-row items-center">
        <h1 className="bg-gradient-to-r from-primary to-light bg-clip-text font-sans font-sans text-2xl text-transparent">
          {selectedMiner.name.toUpperCase()}
        </h1>
        <WelcomeLines />
      </div>
      <div className="">
        <div className="h-[196px] w-full bg-intro-welcome bg-no-repeat py-2 pl-2 pr-10 font-sans text-lg text-white">
          <div className="overflow-scroll no-scrollbar h-[115px] w-[85%]">
            <p>
              {selectedMiner.description}
            </p>      
          </div>              
        </div>
      </div>
      <IntroBody miners={miners} setSelectedMiner={setSelectedMiner} />
    </div>
  );
};

export default ChatLeftSide;
