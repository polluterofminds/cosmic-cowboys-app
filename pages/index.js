import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Logo from "./components/Logo";
import InnerContent from "./components/InnerContent";
import SelectMinerScreen from "./components/SelectMinerScreen/index";
import { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import MainScreen from "./components/MainScreen";
import AuthScreen from "./components/AuthScreen";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ miners }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [selectedMiner, setSelectedMiner] = useState(miners[0]);
  const [chatting, setChatting] = useState(false);

  return (
    <>
      <Head>
        <title>Cosmic Cowboys</title>
        <meta
          name="description"
          content="An adventure game in space where the active players are the NPCs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">        
        {
          authenticated ? 
          <MainScreen chatting={chatting} miners={miners} setSelectedMiner={setSelectedMiner} selectedMiner={selectedMiner} /> : 
          <AuthScreen setAuthenticated={setAuthenticated} />
        }
      </div>
    </>
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const charactersDirectory = fs.readdirSync("./characters");
  const miners = [];
  for (const c of charactersDirectory) {
    let m = JSON.parse(fs.readFileSync(`./characters/${c}`));
    m = {
      ...m, 
      food: 5, 
      health: 10, 
      maxHealth: 10, 
      supplies: 5, 
      credits: 5
    }
    miners.push(m);
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      miners,
    },
  };
}
