import React from "react";
import LeftCard from "../backgrounds/LeftCard";
import GradientHeading from "../Typography/GradientHeading";
import WelcomeLines from "../WelcomeLines";
import Card from "../backgrounds/Card";

const AuthScreen = ({ setAuthenticated, login, logout, userInfo, isLoggedIn }) => {
  return (
    <div className="align-center m-auto flex lg:flex-row flex-col h-screen w-3/4 items-center justify-center">
      <div className="lg:w-1/2">
        <img src="/Logo.png" alt="Cosmic Cowboys" className="lg:h-96 h-64 lg:ml-0 -ml-8" />
      </div>
      <div className="lg:w-1/2 w-full">
        <LeftCard customClasses="p-6 border-b-lg">
          <div className="align-center flex w-full items-center justify-around">
            <GradientHeading customClasses="text-4xl font-san font-bold">
              JACK IN
            </GradientHeading>
            <div className="w-3/4">
              <WelcomeLines />
            </div>
          </div>
          <div className="mb-6 mt-6 flex">
            <Card>
              <div className="p-4 font-sans text-xl font-semibold text-white/60">
                <p>
                  This terminal link is not officially sanctioned, but it's also
                  not officially NOT sanctioned.
                </p>
                <p>
                  Connect and maybe you'll be able to interact with one of the
                  lost space cowboys on Ganymede.
                </p>
                <button
                  type="button"
                  onClick={login}
                  className="hover:bg-grey-500 ml-2 mr-8 mt-4 inline-flex items-center justify-center rounded-md border border-primary bg-btnPrimary px-6 py-1 text-sm font-semibold text-white shadow-sm outline-none"
                >
                  <span className="text-xl">CONNECT</span>
                </button>
              </div>
            </Card>
            <div className="align-center flex w-[10%] flex-col justify-center ml-2">
              <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
              <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
              <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
              <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
            </div>
          </div>
        </LeftCard>
      </div>
    </div>
  );
};

export default AuthScreen;
