// Gobal Theme
import "@/styles/globals.css";

// Next
import type { AppProps } from "next/app";
import Head from "next/head";

// Web3Modal
import { EthereumClient, modalConnectors, walletConnectProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { useWeb3Modal } from "@web3modal/react";
// import customizeWeb3Modal from "@/utils/customizeWeb3Modal";

// React
import { useEffect, useState } from "react";

// Material UI
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "src/utils/createEmotionCache";
import useTheme from "src/utils/theme";

// Progress Bar
import NextNProgress from "nextjs-progressbar";

// Redux
import { store } from "src/redux/app/store";
import { Provider } from "react-redux";

//@ts-ignore
import { querySelectorAllDeep } from "query-selector-shadow-dom";

import customizeWeb3Modal from "src/utils/customizeWeb3Modal";
import { Typography, Box } from "@mui/material";

const chains = [goerli];

const projectID = process.env.WEB3_MODAL_PROJECT_ID || ("23128664cbc1482b7901ef53172c56a6" as string);

// Wagmi client
const { provider } = configureChains(chains, [publicProvider(), walletConnectProvider({ projectId: projectID })]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
        projectId: projectID,
        version: "1", // or "2"
        appName: "web3Modal",
        chains,
    }),
    provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    // @ts-ignore
    const getLayout = Component!.getLayout ?? ((page: any) => page);

    const [isReady, setIsReady] = useState(false);
    const theme = useTheme();

    const web3Modal = useWeb3Modal();

    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        customizeWeb3Modal(web3Modal, querySelectorAllDeep);
    }, [web3Modal]);

    useEffect(() => {
        setTimeout(() => {
            querySelectorAllDeep("span.w3m-medium-normal").forEach((span: HTMLElement) => {
                span.style.setProperty("font-family", "VCROSD");
                span.style.setProperty("font-weight", "500");
            });
            querySelectorAllDeep("w3m-text").forEach((text: HTMLElement) => {
                if(text.innerText==='Connect Wallet'){
                    text.innerText='Connect'
                }
            });
        }, 300);
    }, []);

    const loading = (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 1
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <Box component="img" src="/omnia.png" sx={{ height: "70px", width: "100px" }} />
                <Typography variant="h1" sx={{ color: "primary.main" }}>
                    OMNIA
                </Typography>
            </Box>
            {/* <Box component="img" src="/loading.gif" sx={{
                borderRadius:'10px'
            }} /> */}
        </Box>
    );

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <CssBaseline />
                    <WagmiConfig client={wagmiClient}>
                        <NextNProgress color={theme.palette.primary.main} startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
                        {isReady ? getLayout(<Component {...pageProps} />) : loading}
                    </WagmiConfig>
                </Provider>
            </ThemeProvider>

            <Web3Modal projectId={projectID} ethereumClient={ethereumClient} themeColor="teal" themeMode="dark" />
        </CacheProvider>
    );
}
