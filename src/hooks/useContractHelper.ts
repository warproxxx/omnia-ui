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
        let id = (await vault._nextId()).toNumber()
        
        let activeLoans = [];
        
        type PairType = "USDC" | "WETH" | "WBTC";
        type ReversePairType = Record<string, PairType>;
        const R_PAIRS: ReversePairType = {
        "0xAed85F27Cf3877f1a286AC189a369E95c193fD4A": "USDC",
        "0x5Dc48637677bA4bb928e1b5C2EDF48e2Baa94Fa9": "WETH",
        "0xe0DeD57C164A218e92e53c703e5D2732F4d7A97b": "WBTC",
        };

        for (var i=1; i<=id+1; i++){
            try{
                let item = (await vault._loans(i)) as any;
                if (item.repaymentDate != 0){

                    let start_date = new Date(parseInt((item.timestamp).toString()) * 1000) as any
                    let repayment_date = new Date(parseInt((item.repaymentDate).toString()) * 1000) as any

                    const diffTime = Math.abs(repayment_date - start_date);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 


                    let today = new Date() as any

                    const diffTime2 = Math.abs(repayment_date - today);
                    const diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24)); 

                    let curr = []
                    curr[0] = R_PAIRS[item.loan_asset]
                    curr[1] = i
                    curr[2] = parseFloat(ethers.utils.formatEther(item.principal)).toFixed(3)
                    curr[3] = parseFloat(ethers.utils.formatEther(item.repayment)).toFixed(3)
                    curr[4] = start_date.toISOString().slice(0, 10);
                    curr[5] = diffDays
                    curr[6] = diffDays2
                    curr[7] = "Payback"

                    activeLoans.push(curr)
                }
            } catch (e){

            }
            
        }

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
        return `This extremely efficient Vault uses the capital to create a hedged book by dealing and making multiple assets. It allows duration-based unliquidable loans at an LTV of up to 95% and swaps for and between WBTC, WETH, and USDC. The Vault can provide such loans by opening a hedge in GMX if the assets hit negative equity, ensuring a delta-neutral strategy. While doing swaps and loans, the Vault always ensures a 90% USDC split to provide stability. The swap uses a grid-based asset selloff logic and ensures that only 5% of the Vault is held in a risky non-USDC asset. Backtests show that this swap logic's yield is similar to an asset's market exposure, and the 5% can be used to make volume thousands of times bigger in a matter of days (if there is demand). Apart from market risk (and return) for 10% of the portfolio, the rest of Vault is practically delta neutral due to the hedging. `;
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
        if (!address || !signer) return false;

        try{
            let vault = new ethers.Contract( VAULT, VAULT_ABI, signer);
            console.log(data)
            await vault.repayLoan(data[1]);
            return true;
        }   
        catch(err){
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
        //now this
        if (!address || !signer) return 0;

        let slope = 10 * 100
        let intercept = 400

        let oracle_contract = new ethers.Contract(ORACLE, ORACLE_ABI, signer);
        
        let price1 = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS[apr_params.collateralAsset as keyof typeof PAIRS])) as any
        let price2 = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS[apr_params.borrowAsset as keyof typeof PAIRS])) as any

        let collateralWorth = apr_params.collateralAmount * price1;
        let borrowAmount = apr_params.borrowAmount * price1;

        let ltv = (borrowAmount * 1000)/(collateralWorth);
        let apr = 500
        let MAX_APR = 2000

        if (ltv > 0){

            if (((slope * ltv) / 1000) > intercept){
                apr = Math.max(apr, ((slope * ltv) / 1000) - intercept);
            }

            
        }

        apr = Math.min(apr, MAX_APR)
        console.log(apr/100);
        return apr/100;
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

        let oracle_contract = new ethers.Contract(ORACLE, ORACLE_ABI, signer);

        let price1 = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS[callateralCurrency])) as any
        let price2 = ethers.utils.formatEther(await oracle_contract.getPrice(PAIRS[borrowCurrency])) as any

        return ((callateral * price1)/price2)/2;
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
