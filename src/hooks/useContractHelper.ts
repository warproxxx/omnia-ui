import { StatCards } from 'src/types/types';
import { SelectableAsset } from 'src/types/types';
import { useAccount, useSigner } from "wagmi";
import {useCallback} from 'react'

const useContractHelper = () => {
    const { address } = useAccount();
    const  {data:signer}  = useSigner();
    if(!address) return;
    if(!signer) return;

    const checkWETHApproval = async () => {
        //signer is a ethers.Signer
        //address is a string

        return false;
    }

    const checkWBTCApproval = async () => {
        return false;
    }

    const checkUSDCApproval = async () => {
        return false;
    }

    const checkWETHBalance = async () => {
        return 1;
    }

    const checkWBTCBalance = async () => {
        return 1;
    }

    const checkUSDCBalance = async () => {
        return 1;
    }

    const getPortfolio = async () => {
        //get Active Loans
        const activeLoans =  [
            ["USDC", "1000", "1200", "2021-10-10", "30", "10", "Payback"],
            ["WETH", "1000", "1200", "2021-10-10", "30", "10", "Payback"],
            ["WBTC", "1000", "1200", "2021-10-10", "30", "10", "Payback"],
        ]

        const inactiveLoans =  [
            ["USDC", "1000", "1200", "2021-10-10", "30", "2021-10-10", "Paid"],
            ["WETH", "1000", "1200", "2021-10-10", "30", "2021-10-10", "Paid"],
            ["WBTC", "1000", "1200", "2021-10-10", "30", "2021-10-10", "Defaulted"],
        ]

        return {
            activeLoans,
            inactiveLoans
        }
    }

    const getExchangeStats = async (exchangeAsset1 : SelectableAsset, exchangeAsset2 : SelectableAsset, exchangeStats: any) => {

        const newExchangeStat = [...exchangeStats];
        if(exchangeAsset1 === 'WETH' && exchangeAsset2 === 'USDC' || exchangeAsset1 === 'USDC' && exchangeAsset2 === 'WETH'){
            newExchangeStat[1] = {
                ...newExchangeStat[1],
                value: '6.88 B'
            },
            newExchangeStat[2] = {
                ...newExchangeStat[2],
                value: '+0.91 %'
            }
            return newExchangeStat;
        }

        if(exchangeAsset1 === 'WBTC' && exchangeAsset2 === 'USDC' || exchangeAsset1 === 'USDC' && exchangeAsset2 === 'WBTC'){
            newExchangeStat[1] = {
                ...newExchangeStat[1],
                value: '18.87B'
            },
            newExchangeStat[2] = {
                ...newExchangeStat[2],
                value: '-0.11 %'
            }
            return newExchangeStat;
        }

        if(exchangeAsset1 === 'WETH' && exchangeAsset2 === 'WBTC' || exchangeAsset1 === 'WBTC' && exchangeAsset2 === 'WETH'){
            newExchangeStat[1] = {
                ...newExchangeStat[1],
                value: '307.00k'
            },
            newExchangeStat[2] = {
                ...newExchangeStat[2],
                value: '+0.04 %'
            }
            return newExchangeStat;
        }


    }

    const getVaultStats = async () => {
        return  [
            {
                name: "LTV",
                value: "0",
            },
            {
                name: "Unrealized Profit",
                value: "0",
            },
            {
                name: "Realized Profit",
                value: "0",
            },
            {
                name: "Delta",
                value: "0",
            },
        ]
    }

    const getVaultDescription = async () => {
        return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum`
    }

    const getHedgingStrategy = async () => {
        return [
            {
                name: 'Stat1',
                value: '0'
            },
            {
                name: 'Stat2',
                value: '0'
            },
        ]
    }   

    const getSpotStrategy = async () => {
        return [
            {
                name: 'Stat1',
                value: '0'
            },
            {
                name: 'Stat2',
                value: '0'
            },
        ]
    }

    return {
        checkWETHApproval,
        checkWBTCApproval,
        checkUSDCApproval,
        checkWETHBalance,
        checkWBTCBalance,
        checkUSDCBalance,
        getPortfolio,
        getExchangeStats,
        getVaultStats,
        getVaultDescription,
        getHedgingStrategy,
        getSpotStrategy
    }
}

export default useContractHelper;