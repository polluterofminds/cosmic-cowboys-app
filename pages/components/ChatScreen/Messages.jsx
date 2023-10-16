import React, { useEffect, useRef } from 'react'

const placeholderAvatar = "https://lh3.googleusercontent.com/a/ACg8ocJTmAB0QsXy98ujvGt-nC_HDAs3pVx6OX2IX5gunKCR-zmb=s96-c"

const Messages = ({ messages, selectedMiner, address, userInfo }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.scrollIntoView({behavior: "smooth"})
  }, [messages]);
  return (
    <div className="lg:p-6 w-full max-h-[60vh] overflow-scroll no-scrollbar">
      {
        messages?.map((m, index) => {
          if(m.senderAddress === address) {            
            return (
              <div className="w-full flex align-start justify-start mt-2" key={index}>
                <div className="font-sans">
                 <p className="text-[#FFCC00]">Me: {m.content.split(`${selectedMiner.tokenId} -`)[1]}</p>
                 <p className="text-primary">// End Transmission</p>
                  {/* <img className="ml-2 w-8 h-8 rounded-full" referrerPolicy="no-referrer" src={userInfo.profileImage || placeholderAvatar} alt={address}/>                   */}
                </div>
              </div>
            )
          } else {
            return (
              <div className="w-full flex align-start justify-start mt-4" key={index}>
                <div className="font-sans">
                  {/* <img className="mr-2 w-8 h-8 rounded-full" src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${selectedMiner.image.split("://")[1]}`} alt={selectedMiner.name}/>   */}
                  <p className="text-[#FFCC00] whitespace-break-spaces ">{m.content.includes("***SYSTEM MESSAGE") ? "System" : selectedMiner.name}: {" "} {m.content.split(`${selectedMiner.tokenId} -`)[1]}</p>
                  <p className="text-primary">// End Transmission</p>
                </div>
              </div>
            )
          }
        })
      }
      <div ref={ref} />
    </div>
  )
}

export default Messages