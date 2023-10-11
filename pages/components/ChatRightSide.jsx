import React from "react";
import Messages from "./Messages";
import RocketIcon from "./RocketIcon";

const ChatRightSide = ({ messages }) => {
  return (
    <div className="ml-4 mb-10 w-full rounded-lg border border-primary bg-gradient-to-r from-chatBackgroundPrimary to-chatBackgroundSecondary">
      <div className="flex h-full flex-col justify-end">
        <Messages messages={messages} />
        <div className="">
          <div className="flex px-4 pb-4">
            <input
              type="text"
              className="w-3/4 rounded-lg bg-input bg-opacity-50 p-4 outline-primary"
              placeholder="Try to reach your miner..."
            />
            <button
              type="button"
              className="ml-2 w-1/4 inline-flex justify-center items-center gap-x-2 rounded-md bg-btnPrimary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-grey-500 outline-none"
            >
              <RocketIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              <span className="text-2xl">SEND</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRightSide;
