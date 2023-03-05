import { StatCards } from "src/types/types";
import { SelectableAsset } from "src/types/types";
import { useAccount, useSigner } from "wagmi";
import { useCallback } from "react";
import {ORACLE, VAULT_MANAGER, VAULT, VAULTMANAGER_ABI, ORACLE_ABI, VAULT_ABI, PAIRS, ERC20_ABI } from "../config"
import { ethers } from "ethers";

import { useAppDispatch, useAppSelector } from "src/redux/app/hooks";
import {
    setERC1155Approval,
    setSharesApproval,
    setUSDCApproval,
    setWETHApproval,
    setWBTCApproval,
    setCurrentTokenForApproval,
} from "src/redux/slices/approvalSlice";

import {useState} from 'react';

const useContractHelper = () => {
    const { address } = useAccount();
    const { data: signer } = useSigner();
    const dispatch = useAppDispatch();
    const { WETH, WBTC, USDC, shares, ERC1155 } = useAppSelector((state) => state.approval);


    const checkWETHApproval = async () => {
        try{
            if (!address || !signer) return false;
            let contract = new ethers.Contract( PAIRS['WETH'], ERC20_ABI, signer);
            let x = await contract.allowance(signer.getAddress(), VAULT)

            if (x < BigInt(10**18) * BigInt(10000)){
                return false;
            } else {
                return true;
            }
        } catch(err){
            console.log(err)
            return false
        }
    };

    const checkWBTCApproval = async () => {
        try{
            if (!address || !signer) return false;
            let contract = new ethers.Contract( PAIRS['WBTC'], ERC20_ABI, signer);
            let x = await contract.allowance(signer.getAddress(), VAULT)

            if (x < BigInt(10**18) * BigInt(10000)){
                return false;
            } else {
                return true;
            }
        } catch(err){
            console.log(err)
            return false
        }
    };

    const checkUSDCApproval = async () => {
        try{
            if (!address || !signer) return false;
            let contract = new ethers.Contract( PAIRS['USDC'], ERC20_ABI, signer);
            let x = await contract.allowance(signer.getAddress(), VAULT)

            if (x < BigInt(10**18) * BigInt(10000)){
                return false;
            } else {
                return true;
            }
        } catch(err){
            console.log(err)
            return false
        }
    };

    const checkSharesApproval = async () => {
        //withdraw liquidity
        return true;
    };

    const checkERC1155Approval = async () => {
        //repay loan
        return true;
    };

    const checkWETHBalance = async () => {
        try{
            if (!address || !signer) return 0;

            let contract = new ethers.Contract( PAIRS['WETH'], ERC20_ABI, signer);
            let balance = await contract.balanceOf(signer.getAddress())
            return ethers.utils.formatEther(balance);
        } catch(err){
            console.log(err)
            return 0
        }
        
    };

    const checkWBTCBalance = async () => {
        try{
            if (!address || !signer) return 0;

            let contract = new ethers.Contract( PAIRS['WBTC'], ERC20_ABI, signer);
            let balance = await contract.balanceOf(signer.getAddress())
            return ethers.utils.formatEther(balance);
        } catch(err){
            console.log(err)
            return 0
        }
    };

    const checkUSDCBalance = async () => {
        try{
            if (!address || !signer) return 0;

            let contract = new ethers.Contract( PAIRS['USDC'], ERC20_ABI, signer);
            let balance = await contract.balanceOf(signer.getAddress())
            return ethers.utils.formatEther(balance);
        } catch(err){
            console.log(err)
            return 0
        }
    };

    const checkSharesBalance = async () => {
        try{
            if (!address || !signer) return 0;

            let vault_contract = new ethers.Contract( VAULT , VAULT_ABI , signer)
            let balance = await vault_contract.balanceOf(signer.getAddress(), 0)
            return balance
        } catch(err){
            console.log(err)
            return 0
        }
        
    };

    const checkERC1155Balance = async () => {
        //loan
        return 1;
    };

    const approveWETH = async () => {
        try{
            if (!address || !signer) return false;
            let contract = new ethers.Contract( PAIRS['WETH'], ERC20_ABI, signer);
            await contract.approve(VAULT, ethers.constants.MaxUint256)
            dispatch(setWETHApproval(true))
            return true
        } catch(err){
            dispatch(setWBTCApproval(false));
            console.log(err)
            return false
        }

    };

    const approveWBTC = async () => {
        try{
            if (!address || !signer) return false;
            let contract = new ethers.Contract( PAIRS['WBTC'], ERC20_ABI, signer);
            await contract.approve(VAULT, ethers.constants.MaxUint256)
            dispatch(setWBTCApproval(true));
            return true
        } catch(err){
            dispatch(setWBTCApproval(false));
            console.log(err)
            return false
        }
    };

    const approveUSDC = async () => {
        try{
            if (!address || !signer) return false;
            let contract = new ethers.Contract( PAIRS['USDC'], ERC20_ABI, signer);
            await contract.approve(VAULT, ethers.constants.MaxUint256)
            dispatch(setUSDCApproval(true));
            return true
        } catch(err){
            dispatch(setWBTCApproval(false));
            console.log(err)
            return false
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

        if (!address || !signer) return {
            activeLoans: [],
            inactiveLoans: [],
        };

        let vault = new ethers.Contract( VAULT, VAULT_ABI, signer);
        
        // let err = undefined;
        // let array = [];

        // while (true)
        // while (err === undefined) {
        //   try {
        //     const item = await vault._loans(array.length);
        //     array.push(item);
        //   } catch (e) {
        //     err = e as Error;
        //   }
        // }

        // let loans = await solidityPublicArrayToJsArray(vault, '_loans')
        // console.log("Loans is")
        // console.log(loan)

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
        if (!address || !signer) return [
            {
                name: '',
                value: 0
            }
        ];

        let weth_contract = new ethers.Contract( PAIRS['WETH'], ERC20_ABI, signer);
        let usdc_contract = new ethers.Contract( PAIRS['USDC'], ERC20_ABI, signer);
        let wbtc_contract = new ethers.Contract( PAIRS['WBTC'], ERC20_ABI, signer);
        let vault = new ethers.Contract( VAULT, VAULT_ABI, signer);

        let [usd, delta] = await vault.getUSDBalanceAndDelta()
        
        let lp_balance = await vault.balanceOf(signer.getAddress(), 0)

        return [
            {
                name: "USD Worth",
                value: parseFloat(ethers.utils.formatEther(usd)).toFixed(0),
            },
            {
                name: "WETH Balance",
                value: parseFloat(ethers.utils.formatEther(await weth_contract.balanceOf(VAULT))).toFixed(3),
            },
            {
                name: "USDC Balance",
                value: parseFloat(ethers.utils.formatEther(await usdc_contract.balanceOf(VAULT))).toFixed(0),
            },
            {
                name: "WBTC Balance",
                value: parseFloat(ethers.utils.formatEther(await wbtc_contract.balanceOf(VAULT))).toFixed(4),
            },
            {
                name: "Delta",
                value: 1,
            },
            {
                name: "LP Tokens",
                value: parseFloat(ethers.utils.formatEther(lp_balance)).toFixed(0),
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
        type dataType = {
            apr: number;
            borrowAmount: number;
            callateral: number;
            duration: string;
            exchangeAsset1: string;
            exchangeAsset2: string;
            inputError: string;
            returnAmount: number;
        }

        let typedData : dataType = data;

        if (!address || !signer) return false;

        let now = Date.now()/1000
        let repaymentDate = parseInt(now.toString()) + parseInt(typedData.duration) * 86400
        
        try{
            let vault = new ethers.Contract( VAULT, VAULT_ABI, signer);
            await vault.createLoan(PAIRS[typedData.exchangeAsset2 as keyof typeof PAIRS], PAIRS[typedData.exchangeAsset1 as keyof typeof PAIRS], ethers.utils.parseUnits(String(typedData.callateral), "ether"), ethers.utils.parseUnits(String(typedData.borrowAmount), "ether"), repaymentDate)
            return true;
        }
        catch(err){
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
            type dataType = {
                exchangeAsset1: string;
                exchangeAsset2: string;
                asset1: number;
                asset2: number;
                inputError: boolean;
            }
    
            let typedData : dataType = data;
    
            if (!address || !signer) return false;
    
            try{
                let vault = new ethers.Contract( VAULT, VAULT_ABI, signer);
                let exactAmt = ethers.utils.parseUnits(String(typedData.asset1), "ether");

                console.log(PAIRS[typedData.exchangeAsset1 as keyof typeof PAIRS], PAIRS[typedData.exchangeAsset2 as keyof typeof PAIRS], exactAmt)

                await vault.swap(PAIRS[typedData.exchangeAsset1 as keyof typeof PAIRS], PAIRS[typedData.exchangeAsset2 as keyof typeof PAIRS], exactAmt)
                return true;
            }
            catch(err){
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
        
        type dataType = {
            depositAmount: number;
            depositInputError: string;
            transactionCurrency: string;
        }

        let typedData : dataType = data;

        if (!address || !signer) return false;

        try{
            let vault = new ethers.Contract( VAULT, VAULT_ABI, signer);
            let exactAmt = ethers.utils.parseUnits(String(data.depositAmount), "ether");
            await vault.addLiquidity(exactAmt,  PAIRS[typedData.transactionCurrency as keyof typeof PAIRS]);
            return true;
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

            type dataType = {
                withdrawAmount: number;
                withdrawInputError: string;
                transactionCurrency: string;
            }

    
            let typedData : dataType = data;
    
            if (!address || !signer) return false;
    
            try{
                let vault = new ethers.Contract( VAULT, VAULT_ABI, signer);
                let exactAmt = ethers.utils.parseUnits(String(data.withdrawAmount), "ether");


                
                await vault.withdrawLiquidity(exactAmt,  PAIRS[typedData.transactionCurrency as keyof typeof PAIRS]);
                return true;    
            }
            catch(err){
                console.error(err);
                return false;
            }
    };

    const getUserBalance = async () => {
        if (!address || !signer) return {
            WETH: 0,
            WBTC: 0,
            USDC: 0,
        };
        let vault = new ethers.Contract( VAULT, VAULT_ABI, signer);
        let balance = await vault.balanceOf(signer.getAddress(), 0)
        let[usd, delta] = await vault.getUSDBalanceAndDelta()

        let weth_contract = new ethers.Contract( PAIRS['WETH'], ERC20_ABI, signer);
        let usdc_contract = new ethers.Contract( PAIRS['USDC'], ERC20_ABI, signer);
        let wbtc_contract = new ethers.Contract( PAIRS['WBTC'], ERC20_ABI, signer);

        let oracle_contract = new ethers.Contract(ORACLE, ORACLE_ABI, signer);


        let weth_vault = ethers.utils.formatEther(await weth_contract.balanceOf(VAULT)) as any
        let wbtc_vault = ethers.utils.formatEther(await usdc_contract.balanceOf(VAULT)) as any
        let usdc_vault = ethers.utils.formatEther(await wbtc_contract.balanceOf(VAULT)) as any

        let weth_price = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS['WETH'])) as any
        let wbtc_price = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS['WBTC'])) as any
        let usdc_price = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS['USDC'])) as any

        


        return {
            WETH: Math.min((usd/weth_price), weth_vault),
            WBTC: Math.min((usd/wbtc_price), wbtc_vault),
            USDC: Math.min((usd/usdc_price), usdc_vault),
        }
    }

    const getBorrowValuesApr = async (apr_params:{
        collateralAsset: SelectableAsset,
        borrowAsset: SelectableAsset,
        collateralAmount: number,
        borrowAmount: number,
        borrowDuration: number
    }) => {
        console.log(apr_params);
        return 5;
    }

    const calculateSwapValuesForAsset1 = async (asset1: number, asset1Currency: SelectableAsset, asset2Currency: SelectableAsset ) => {   
        
        
        if (!address || !signer) return 0;

        let oracle_contract = new ethers.Contract(ORACLE, ORACLE_ABI, signer);
        
        let price1 = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS[asset1Currency])) as any
        let price2 = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS[asset2Currency])) as any

        
        return (asset1 * price1)/price2;
    }

    const calculateSwapValuesForAsset2 = async (asset2: number, asset1Currency: SelectableAsset, asset2Currency: SelectableAsset ) => {
        if (!address || !signer) return 0;
        let oracle_contract = new ethers.Contract(ORACLE, ORACLE_ABI, signer);
        
        let price1 = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS[asset1Currency])) as any
        let price2 = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS[asset2Currency])) as any

        
        return (asset2 * price2)/price1;
    }

    const calculateBorrowValuesForCallateral = async (callateral: number, callateralCurrency: SelectableAsset, borrowCurrency: SelectableAsset, duration: number ) => {
        if (!address || !signer) return 0;
        return callateral + 2;
    }
    

    const getTestTokens = async () => {
        if (!address || !signer) return false;
        console.log("Getting test tokens");
        let weth = new ethers.Contract( PAIRS['WETH'], ERC20_ABI, signer);
        let usdc = new ethers.Contract( PAIRS['USDC'], ERC20_ABI, signer);
        let wbtc = new ethers.Contract( PAIRS['WBTC'], ERC20_ABI, signer);

        await weth.mint(signer.getAddress())
        await usdc.mint(signer.getAddress())
        await wbtc.mint(signer.getAddress())
    }


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
        getUserBalance,
        getBorrowValuesApr,
        getTestTokens,
        calculateSwapValuesForAsset1,
        calculateSwapValuesForAsset2,
        calculateBorrowValuesForCallateral
    };
};

export default useContractHelper;
