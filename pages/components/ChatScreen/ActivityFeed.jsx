import React from "react";

const ActivityFeed = ({ activity, minerName }) => {
  const getName = (activityItem) => {
    if (
      activityItem.content.includes(
        "Your contribution will help ensure this miner survives another day on Ganymede"
      )
    ) {
      return "You";
    } else {
      return minerName;
    }
  };
  const getAction = (activityItem) => {
    if (activityItem.content.includes("Action taken")) {
      switch (activityItem.content) {
        case activityItem.content.includes("goToSupplyDepot"):
          return "visited the supply depot.";
        case activityItem.content.includes("goToHome"):
          return "visited their home base.";
        case activityItem.content.includes("goToBar"):
          return "visited the bar.";
        case activityItem.content.includes("buySupplies"):
          return "bought supplies.";
        case activityItem.content.includes("sellSupplies"):
          return "sold supplies.";
        case activityItem.content.includes("launchSupplyMission"):
          return "launched a supply mission.";
        default:
          break;
      }
    }
  };
  return (
    <ul role="list" className="space-y-6">
      {activity.map((activityItem, activityItemIdx) => (
        <li key={activityItemIdx} className="relative flex gap-x-4">
          <div
            className={classNames(
              activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
              "absolute left-0 top-0 flex w-6 justify-center"
            )}
          >
            <div className="w-px bg-gray-200" />
          </div>
          <>
            <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
            </div>
            <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
              <span className="font-medium text-gray-900">
                {getName(activityItem)}
              </span>{" "}
              {getAction(activityItem)}
            </p>
            <time
              dateTime={activityItem.date}
              className="flex-none py-0.5 text-xs leading-5 text-gray-500"
            >
              {activityItem.date}
            </time>
          </>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;
