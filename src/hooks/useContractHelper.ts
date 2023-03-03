import { StatCards } from "src/types/types";
import { SelectableAsset } from "src/types/types";
import { useAccount, useSigner } from "wagmi";
import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "src/redux/app/hooks";
import {
    setERC1155Approval,
    setSharesApproval,
    setUSDCApproval,
    setWETHApproval,
    setWBTCApproval,
    setCurrentTokenForApproval,
} from "src/redux/slices/approvalSlice";

const useContractHelper = () => {
    const { address } = useAccount();
    const { data: signer } = useSigner();
    const dispatch = useAppDispatch();
    const { WETH, WBTC, USDC, shares, ERC1155 } = useAppSelector((state) => state.approval);

    const checkWETHApproval = async () => {
        if (!address || !signer) return false;
    
        //signer is a ethers.Signer
        //address is a string

        return false;
    };

    const checkWBTCApproval = async () => {
        return false;
    };

    const checkUSDCApproval = async () => {
        return false;
    };

    const checkSharesApproval = async () => {
        return false;
    };

    const checkERC1155Approval = async () => {
        return false;
    };

    const checkWETHBalance = async () => {
        return 1;
    };

    const checkWBTCBalance = async () => {
        return 1;
    };

    const checkUSDCBalance = async () => {
        return 1;
    };

    const checkSharesBalance = async () => {
        return 1;
    };

    const checkERC1155Balance = async () => {
        return 1;
    };

    const approveWETH = async () => {
        try{
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                dispatch(setWETHApproval(true));
                return true;
            } else {
                dispatch(setWETHApproval(false));
                return false;
            }
        }
        catch(err){
            console.log(err);
            return false;
        }
    };

    const approveWBTC = async () => {
        try{
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                dispatch(setWBTCApproval(true));
                return true;
            } else {
                dispatch(setWBTCApproval(false));
                throw new Error("Approval failed");
            }
        }
        catch(err){
            console.log(err);
            return false;
        }

    };

    const approveUSDC = async () => {
        try{
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                dispatch(setUSDCApproval(true));
                return true;
            } else {
                dispatch(setUSDCApproval(false));
                throw new Error("Approval failed");
            }
        }
        catch(err){
            console.log(err);
            return false;
        }
    };

    const approveShares = async () => {
        try{
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                dispatch(setSharesApproval(true));
                return true;
            } else {
                dispatch(setSharesApproval(false));
                throw new Error("Approval failed");
            }
        }
        catch(err){
            console.log(err);
            return false;
        }

    };

    const approveERC1155 = async () => {
        try{
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                dispatch(setERC1155Approval(true));
                return true;
            } else {
                dispatch(setERC1155Approval(false));
                throw new Error("Approval failed");
            }
        }
        catch(err){
            console.log(err);
            return false;
        }

    };

    const approveToken = async (token: SelectableAsset | "shares" | "ERC1155") => {
        switch (token) {
            case "WETH":
                if (WETH) return true;
                dispatch(setCurrentTokenForApproval("WETH"));
                break;
            case "WBTC":
                if (WBTC) return true;
                dispatch(setCurrentTokenForApproval("WBTC"));
                break;
            case "USDC":
                if (USDC) return true;
                dispatch(setCurrentTokenForApproval("USDC"));
                break;
            case "shares":
                if (shares) return true;
                dispatch(setCurrentTokenForApproval("shares"));
                break;
            case "ERC1155":
                if (ERC1155) return true;
                dispatch(setCurrentTokenForApproval("ERC1155"));
                break;
            default:
                return false;
        }
    };

    const getPortfolio = async () => {
        //get Active Loans
        const activeLoans = [
            ["USDC", "1000", "1200", "2021-10-10", "30", "10", "Payback"],
            ["WETH", "1000", "1200", "2021-10-10", "30", "10", "Payback"],
            ["WBTC", "1000", "1200", "2021-10-10", "30", "10", "Payback"],
        ];

        const inactiveLoans = [
            ["USDC", "1000", "1200", "2021-10-10", "30", "2021-10-10", "Paid"],
            ["WETH", "1000", "1200", "2021-10-10", "30", "2021-10-10", "Paid"],
            ["WBTC", "1000", "1200", "2021-10-10", "30", "2021-10-10", "Defaulted"],
        ];

        return {
            activeLoans,
            inactiveLoans,
        };
    };

    const getExchangeStats = async (exchangeAsset1: SelectableAsset, exchangeAsset2: SelectableAsset, exchangeStats: any) => {
        let url = `api/scrape?asset1=${exchangeAsset1}&asset2=${exchangeAsset2}`;
        const response = await fetch(url);
        const data = await response.json();
        const newExchangeStat = [...exchangeStats];
        (newExchangeStat[0] = {
            ...newExchangeStat[0],
            value: data.oneDayVolume,
        }),
        (newExchangeStat[1] = {
            ...newExchangeStat[1],
            value: data.oneDayPercentChange,
        });
        (newExchangeStat[2] = {
            ...newExchangeStat[2],
            value: data.oneDayChange,
        });
        (newExchangeStat[3] = {
            ...newExchangeStat[3],
            value: data.totalVolume,
        });        
        (newExchangeStat[4] = {
            ...newExchangeStat[4],
            value: data.cirCulatingSupply,
        });     
        (newExchangeStat[5] = {
            ...newExchangeStat[5],
            value: data.marketCap,
        });      
        return newExchangeStat;
    };

    const getVaultStats = async () => {
        return [
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
        ];
    };

    const getVaultDescription = async () => {
        return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum`;
    };

    const getHedgingStrategy = async () => {
        return [
            {
                name: "Stat1",
                value: "0",
            },
            {
                name: "Stat2",
                value: "0",
            },
        ];
    };

    const getSpotStrategy = async () => {
        return [
            {
                name: "Stat1",
                value: "0",
            },
            {
                name: "Stat2",
                value: "0",
            },
        ];
    };

    const payLoan = async (data: any) => {
        try {
            console.log(data);
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                return true;
            } else {
                throw new Error("Error");
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const handleBorrow = async (data: any) => {
        //signer is a ethers.Signer
        //address is a string

        /*
        data ={
            apr: 0,
            borrowAmount : 0
            callateral: 0
            duration : "7"
            exchangeAsset1: "WETH"
            exchangeAsset2: "USDC"
            inputError: ""
            returnAmount : 0
        }
        */
        try {
            console.log(data);
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                return true;
            } else {
                throw new Error("Error");
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const handleSwap = async (data: any) => {
        /*
            data = {exchangeAsset1: 'WETH', 
            exchangeAsset2: 'USDC', 
            asset1: 0, 
            asset2: 0, 
            inputError: null}
        */
        try {
            console.log(data);
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                return true;
            } else {
                throw new Error("Error");
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const handleDeposit = async (data: any) => {
        /*
            data = {
                depositAmount: 0, 
                depositInputError: null, 
                transactionCurrency: 'WETH'
            }
        */
        try{
            console.log(data);
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                return true;
            } else {
                throw new Error("Error");
            }
        }
        catch(err){
            console.error(err);
            return false;
        }
    };

    const handleWithdraw = async (data: any) => {
        /*
            data = 
            {
                withdrawAmount: 0, 
                withdrawInputError: null,
                transactionCurrency: 'WETH'
            }
        */

        try{
            console.log(data);
            const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
            await waitFor(500);
            // 50 50 change of approval
            if (Math.random() > 0.5) {
                return true;
            } else {
                throw new Error("Error");
            }
        }
        catch(err){
            console.error(err);
            return false;
        }

    };

    return {
        checkWETHApproval,
        checkWBTCApproval,
        checkUSDCApproval,
        checkSharesApproval,
        checkERC1155Approval,
        checkWETHBalance,
        checkWBTCBalance,
        checkUSDCBalance,
        checkSharesBalance,
        checkERC1155Balance,
        approveWETH,
        approveWBTC,
        approveUSDC,
        approveShares,
        approveERC1155,
        approveToken,
        getPortfolio,
        getExchangeStats,
        getVaultStats,
        getVaultDescription,
        getHedgingStrategy,
        getSpotStrategy,
        payLoan,
        handleBorrow,
        handleSwap,
        handleDeposit,
        handleWithdraw,
    };
};

export default useContractHelper;
