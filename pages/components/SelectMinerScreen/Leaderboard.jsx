import React from 'react'

const Leaderboard = ({miners}) => {
  return (
    <div className="min-w-full">
      <div>
        <div className="flex">
          <div
            scope="col"
            className="w-[10%] py-3.5 pl-4 pr-3 text-left text-xl font-semibold font-sans text-primary sm:pl-0"
          >
            #
          </div>
          <div
            scope="col"
            className="w-[60%] px-3 py-3.5 text-left text-xl font-semibold font-sans text-primary"
          >
            MINER
          </div>
          <div
            scope="col"
            className="w-[30%] px-3 py-3.5 text-left text-xl font-semibold font-sans text-primary"
          >
            VITALS
          </div>
        </div>
      </div>
      <div className="min-w-full">
        {miners?.map((person) => (
          <div className="border border-primary rounded-md flex w-full mb-2 items-center" key={person.tokenId}>
            <div className="w-[10%] whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <div className="text-white/60">{person.tokenId}</div>                
            </div>
            <div className="w-[60%] whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
              <div className="lg:flex items-center">
                <div className="h-11 w-11 flex-shrink-0">
                  <img
                    className="lg:h-11 lg:w-11 h-8 w-8 rounded-full"
                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${person?.image?.split("://")[1]}`}
                    alt={person?.name}
                  />
                </div>
                <div className="lg:ml-4">
                  <div className="font-medium lg:text-xl text-sm text-white/60">
                    {person?.name?.toUpperCase()}
                  </div>
                 <div className="hidden lg:inline mt-1 text-white/60">{person?.tba}</div>
                </div>
              </div>
            </div>
            <div className="w-[30%] whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <div className="text-white/60 lg:text-lg text-sm">{person?.credits} credits</div>
              <div className="hidden lg:inline lg:mt-1 text-white/60">{person?.health + " health, " + person.food + " food, " + person.supplies + " supplies"}</div>
            </div>              
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard