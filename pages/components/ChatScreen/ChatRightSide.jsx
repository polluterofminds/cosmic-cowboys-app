import React from "react";
import Messages from "../Messages";
import RocketIcon from "../RocketIcon";

const ChatRightSide = ({ messages }) => {
  return (
    <div className="h-full w-3/5">
      <div className="mb-20 mt-6 ml-4 rounded-lg border border-primary bg-gradient-to-r from-chatBackgroundPrimary to-chatBackgroundSecondary">
        <div className="flex min-h-[65vh] max-h-[85%] flex-col justify-end">
          <Messages messages={messages} />
          <div className="h-full">
            <div className="flex px-4 pb-4">
              <input
                type="text"
                className="w-3/4 rounded-lg bg-input bg-opacity-50 p-4 outline-primary"
                placeholder="Try to reach your miner..."
              />
              <button
                type="button"
                className="hover:bg-grey-500 ml-2 inline-flex w-1/4 items-center justify-center gap-x-2 rounded-md bg-btnPrimary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm outline-none"
              >
                <RocketIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                <span className="text-2xl">SEND</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRightSide;
