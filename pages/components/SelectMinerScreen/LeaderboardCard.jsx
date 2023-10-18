import React from 'react'
import GradientHeading from '../Typography/GradientHeading'
import WelcomeLines from '../WelcomeLines'
import Card from '../backgrounds/Card'

const LeaderboardCard = () => {
  return (
    <div className="m-auto mt-10 w-[90%]">
    <div className="flex w-full items-center">
      <GradientHeading customClasses="font-sans text-4xl font-bold">
        LEADERBOARD
      </GradientHeading>
      <div className="w-full">
        <WelcomeLines />
      </div>
    </div>
    <div className="flex">
      <div className="mt-4 w-[90%] p-4">
        <Card customClasses="p-4">
          <p className="font-sans text-lg font-semibold text-white/60">
            We want our miners to come home, but we also want to understand the sociological impact of life on space. To that end, we are monitoring progress and societal power for each miner.
          </p>
          <p className="font-sans text-lg font-semibold text-white/60">Please follow along and see if your miner can climb the leaderboard of societal power. As a reminder: power is the combination of health, food, supplies, and credits.</p>
        </Card>
      </div>
      <div className="align-center mt-4 flex w-[10%] flex-col justify-center">
        <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
        <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
        <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
        <div className="mb-[5px] h-6 w-6 rounded-full border-[0.5px] border-primary" />
      </div>
    </div>
  </div>
  )
}

export default LeaderboardCard