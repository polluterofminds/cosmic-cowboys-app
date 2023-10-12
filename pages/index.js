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

const connectedHandler = (data) => console.log('CONNECTED', data)
const disconnectedHandler = (data) => console.log('DISCONNECTED', data)

export default function Home({ miners }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [selectedMiner, setSelectedMiner] = useState(miners[0]);
  const [chatting, setChatting] = useState(false);
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState()
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [provider, setProvider] = useState(null)
  const [messages, setMessage] = useState([]);

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

  const login = async () => {
    if (!web3AuthModalPack) return

    const signInInfo = await web3AuthModalPack.signIn()
    console.log('SIGN IN RESPONSE: ', signInInfo)

    const userInfo = await web3AuthModalPack.getUserInfo()
    console.log('USER INFO: ', userInfo)

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
          !!provider ? 
          <MainScreen setChatting={setChatting} logout={logout} userInfo={userInfo} chatting={chatting} miners={miners} setSelectedMiner={setSelectedMiner} selectedMiner={selectedMiner} /> : 
          <AuthScreen login={login} isLoggedIn={!!provider} setAuthenticated={setAuthenticated} />
        }
      </div>
    </>
  );
}

export async function getStaticProps() {
  const miners = await getNPCState();
  return {
    props: {
      miners,
    },
  };
}
