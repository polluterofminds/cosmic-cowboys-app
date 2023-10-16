import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import MainScreen from "./components/MainScreen";
import AuthScreen from "./components/AuthScreen";
import { Web3AuthModalPack } from '@safe-global/auth-kit'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  UserInfo,
  WALLET_ADAPTERS
} from '@web3auth/base'
import { getNPCState } from "@/services/npc";
import { Client } from "@xmtp/xmtp-js";
const { ethers } = require("ethers");

const connectedHandler = (data) => console.log('CONNECTED', data)
const disconnectedHandler = (data) => console.log('DISCONNECTED', data)

export default function Home({ npcs, hash }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [miners, setMiners] = useState(npcs);
  const [selectedMiner, setSelectedMiner] = useState(npcs[0]);
  const [chatting, setChatting] = useState(false);
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState()
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [provider, setProvider] = useState(null)
  const [messages, setMessages] = useState([]);
  const [xmtpClient, setXmtp] = useState(null);
  const [xmtpConversation, setConversation] = useState(null);
  const [cachedIndexHash, setCachedIndexHash] = useState(hash);

  useEffect(() => {
    setInterval(() => {
      fetchCachedMiners();
    }, (1000 * 30))    
  }, []);

  useEffect(() => {
    ;(async () => {
      const options = {
        clientId: 'BHDEnJ-SY7nlS2PPH2mi98qUINUqGrUYyvUN9EbV794phQXTyRTqMLQGBNgiBeGkWOoGSJrvo-Skf04QzOJIRa0',
        web3AuthNetwork: 'testnet',
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0x5',
          rpcTarget: `https://eth-goerli.g.alchemy.com/v2/5yw4q3nVpsox1Nhnq5o3mmmn7hW3_ut6`
        },
        uiConfig: {
          theme: 'dark',
          loginMethodsOrder: ['google', 'facebook']
        }
      }

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: 'torus',
          showOnModal: false
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: 'metamask',
          showOnDesktop: true,
          showOnMobile: false
        }
      }

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'mandatory'
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'Safe'
          }
        }
      })

      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: 'https://safe-transaction-goerli.safe.global'
      })

      await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig })

      web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)

      web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler)

      setWeb3AuthModalPack(web3AuthModalPack)

      return () => {
        web3AuthModalPack.unsubscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)
        web3AuthModalPack.unsubscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler)
      }
    })()    
  }, [])

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      ;(async () => {
        await login()
      })()
    }
  }, [web3AuthModalPack])

  const fetchCachedMiners = async () => {
    console.log("fetching from blockchain...");
    fetch("/api/getNpc");
    console.log("Fetching from cache")
    const res = await fetch("/api/getNpc?cached=true");
    const json = await res.json();
    const { hash, mergedNpcData } = json;
    if(hash !== cachedIndexHash) {
      console.log("New hash");
      //  @TODO Fire an alert
      setMiners(mergedNpcData);
      setSelectedMiner(mergedNpcData.find((m) => m.tokenId === selectedMiner.tokenId));
    }    
  }

  const login = async () => {
    if (!web3AuthModalPack) return

    const signInInfo = await web3AuthModalPack.signIn()
    const userInfo = await web3AuthModalPack.getUserInfo()

    setSafeAuthSignInResponse(signInInfo)
    setUserInfo(userInfo || undefined)
    setProvider(web3AuthModalPack.getProvider())
  }

  const logout = async () => {
    if (!web3AuthModalPack) return

    await web3AuthModalPack.signOut()

    setProvider(null)
    setSafeAuthSignInResponse(null)
  }

  const selectMiner = (m) => {
    setMessages([]);
    setSelectedMiner(m);
  }

  const startChatting = async () => {
    try {
      const address = selectedMiner.tba;
      setChatting(true);

      const provider = new ethers.BrowserProvider(web3AuthModalPack.getProvider())
      const signer = await provider.getSigner()
      
      const xmtp = await Client.create(signer);
      setXmtp(xmtp);
             
      const conversation = await xmtp.conversations.newConversation(process.env.NEXT_PUBLIC_SERVER_WALLET);       
      setConversation(conversation);
      const xmtpMessages = await conversation.messages();            
      const messagesToShow = xmtpMessages.filter(m => m.content.substring(0, selectedMiner.tokenId.length) === selectedMiner.tokenId);      
      
      setMessages(messagesToShow)
    } catch (error) {
      console.log(error);
      alert("Trouble connecting through terminal link")
      setChatting(false);
    }       
  }
  
  const updateMessages = async () => {
    const xmtpMessages = await xmtpConversation.messages();
    const messagesToShow = xmtpMessages.filter(m => m.content.substring(0, selectedMiner.tokenId.length) === selectedMiner.tokenId);          
    setMessages(messagesToShow)
  }

  const sendMessage = async (text) => {
    try {   
      await xmtpConversation.send(`${selectedMiner.tokenId} - ${text}`);
      await updateMessages();
      await fetch("/api/chat", {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({text, npc: selectedMiner, address: safeAuthSignInResponse.eoa})
      })      
      await updateMessages();
    } catch (error) {
      console.log(error);
    }
  }

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
      <div className="pb-10 min-h-[100vh] max-w-[100%]">            
        {
          !!provider ? 
          <MainScreen userInfo={userInfo} address={safeAuthSignInResponse.eoa} sendMessage={sendMessage} setChatting={setChatting} startChatting={startChatting} logout={logout} chatting={chatting} miners={miners} selectMiner={selectMiner} selectedMiner={selectedMiner} messages={messages} /> : 
          <AuthScreen login={login} isLoggedIn={!!provider} setAuthenticated={setAuthenticated} />
        }
      </div>
    </>
  );
}

export async function getStaticProps() {
  const {hash, mergedNpcData} = await getNPCState();
  return {
    props: {
      hash,
      npcs: mergedNpcData,
    },
  };
}
