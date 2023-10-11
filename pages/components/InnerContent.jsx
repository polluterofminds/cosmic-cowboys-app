import React from "react";
import WelcomeLines from "./WelcomeLines";
import IntroWelcome from "./IntroWelcome";
import IntroBody from "./IntroBody";

const InnerContent = ({ miners, setSelectedMiner }) => {
  return (
    <div>
      <div className="align-center flex flex-row h-auto items-center mb-2">
        <h1 className="text-2xl bg-gradient-to-r from-primary to-light bg-clip-text font-sans text-transparent">
          WELCOME
        </h1>
        <WelcomeLines />
      </div>
      <IntroWelcome />
      <IntroBody miners={miners} setSelectedMiner={setSelectedMiner} />
    </div>
  );
};

export default InnerContent;
