import React from "react";

const ActivityFeed = ({ activity, minerName }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const getName = (activityItem) => {    
    if (
      activityItem?.content.includes(
        "Your contribution will help ensure this miner survives another day on Ganymede"
      )
    ) {
      return "Someone";
    } else {
      return minerName;
    }
  };
  const getAction = (activityItem) => {
    if (activityItem?.content?.includes("Action taken")) {
      if (activityItem?.content.includes("goToHome")) {
        return "visited their home base.";
      }

      if (activityItem?.content.includes("goToBar")) {
        return "visited the bar.";
      }

      if (activityItem?.content.includes("buySupplies")) {
        return "bought supplies.";
      }

      if (activityItem?.content.includes("sellSupplies")) {
        return "sold supplies.";
      }
      if (activityItem?.content.includes("launchSupplyMission")) {
        return "launched a supply mission.";
      }

      if (activityItem?.content.includes("goToSupplyDepot")) {        
        return "visited the supply depot.";
      }
      return "";
    } else if (
      activityItem?.content.includes(
        "Your contribution will help ensure this miner survives another day on Ganymede"
      )
    ) {
      return `sent ${minerName} 5 credits.`;
    }

    return "";
  };
  return (
    <ul role="list" className="no-scrollbar h-full mt-4 space-y-6 overflow-scroll">
      {activity?.map((activityItem, activityItemIdx) => (
        <li key={activityItemIdx} className="relative flex gap-x-4">
          <div
            className={classNames(
              activityItemIdx === activity?.length - 1 ? "h-6" : "-bottom-6",
              "absolute left-0 top-0 flex w-6 justify-center"
            )}
          >
            <div className="w-px bg-primary" />
          </div>
          <div className="flex">
            <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-transparent">
              <div className="h-2 w-2 rounded-full bg-primary ring-1 ring-primary" />
            </div>
            <div>
              <p className="flex-auto text-xs leading-5 text-primary">
                <span className="font-medium text-primary text-lg">
                  {getName(activityItem)}
                </span>{" "}
                <span className="text-credits text-lg">{getAction(activityItem)}</span>
              </p>
              <time
                dateTime={activityItem?.date}
                className="flex-none text-xs leading-5 text-white/60"
              >
                {new Date(activityItem?.date)?.toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;
