import React, { useEffect, useRef } from 'react'

const placeholderAvatar = "https://lh3.googleusercontent.com/a/ACg8ocJTmAB0QsXy98ujvGt-nC_HDAs3pVx6OX2IX5gunKCR-zmb=s96-c"

const Messages = ({ messages, selectedMiner, address, userInfo }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.scrollIntoView({behavior: "smooth", block:"end"})
  }, [messages]);
  return (
    <div className="lg:p-6 w-full max-h-[60vh] overflow-scroll no-scrollbar">
      {
        messages?.map((m, index) => {
          if(m.senderAddress === address) {            
            return (
              <div className="w-full flex align-end justify-end mt-2" key={index}>
                <div className="w-3/4 flex justify-end">
                  <div className="bg-primary p-2 rounded-xl"><p>{m.content.split(`${selectedMiner.tokenId} -`)[1]}</p></div>
                  <img className="ml-2 w-8 h-8 rounded-full" referrerPolicy="no-referrer" src={userInfo.profileImage || placeholderAvatar} alt={address}/>                  
                </div>
              </div>
            )
          } else {
            return (
              <div className="w-full flex align-start justify-start mt-2" key={index}>
                <div className="w-3/4 flex justify-start">
                  <img className="mr-2 w-8 h-8 rounded-full" src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${selectedMiner.image.split("://")[1]}`} alt={selectedMiner.name}/>  
                  <div className="bg-light p-2 rounded-xl"><p>{m.content.split(`${selectedMiner.tokenId} -`)[1]}</p></div>
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