import React from "react";

const IntroBody = ({ miners, setSelectedMiner }) => {
  return (
    <div className="h-[422px] w-[489px] bg-intro-body bg-no-repeat pt-20 -mt-20">
      <div className="h-[300px] overflow-auto no-scrollbar">
      {
        miners && miners.length > 0 ? 
        <div className="ml-4">
          {
            miners.map(m => {
              return (
                <div aria-label="button" onClick={() => setSelectedMiner(m)} key={m.image} className="flex flex-row align-center h-20 py-2 cursor-pointer">
                  <img className="h-20 w-20 rounded-full" src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${m.image.split("://")[1]}`} alt={m.name}/>
                  <div className="flex flex-col align-center h-20 justify-center ml-4">
                    <h3 className="text-white font-sans text-2xl">{m.name}</h3>
                  </div>
                </div>
              )
            })
          }
        </div> : 
        <div>
          <h1 className="text-white font-sans text-2xl text-center pt-40">Loading miners...</h1>
        </div>
      }
      </div>      
    </div>
  );
};

export default IntroBody;
