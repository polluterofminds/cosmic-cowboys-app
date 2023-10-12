import React from 'react'
import ChatLeftSide from './ChatLeftSide'
import ChatRightSide from './ChatRightSide'
import LeftCard from '../backgrounds/LeftCard'

const ChatScreen = ({ setChatting, selectedMiner }) => {
  return (
    <div className="pt-32 pb-16 min-h-[65vh]">
      <LeftCard customClasses="hidden lg:flex w-[85%] m-auto h-full mt-6 px-10 items-end justify-end">
        <ChatLeftSide
          selectedMiner={selectedMiner}  
          setChatting={setChatting}
        />
        <ChatRightSide />
      </LeftCard>
  </div>
  )
}

export default ChatScreen