import { PortfolioSlice } from './../redux/slices/portfolioSlice';
export type SelectableAsset = "WETH" | "WBTC" | "USDC";

export type StatCards = Array<{name:string, value:string|number}>;

export type VaultStatCards = Array<{name:string, value:string|number}>;

export type SwapValues = { asset1: number | string; asset2: number | string; inputError: string | null };

export type BorrowValues = {
    callateral: number | string;
    borrowAmount: number | string;
    returnAmount: number;
    duration: string;
    inputError: string | null;
    apr: number | string;
};

export type DepositValues = {
    depositAmount: number | string;
    depositInputError: string | null;
}

export type WithdrawValues = {
    withdrawAmount: number | string;
    withdrawInputError: string | null;
    balance: {
        'WETH': number;
        'USDC': number;
        'WBTC': number;
    };
}

export type PortfolioLoans = Array<Array<string>>;

export type UserBalance = {
    WETH: number;
    WBTC: number;
    USDC: number;
    shares: number;
    ERC1155: number;
}

export type TransactionStatus = "success" | "pending" | "error" | null;

