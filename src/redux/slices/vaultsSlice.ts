import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/app/store";
import { SelectableAsset, StatCards, WithdrawValues,DepositValues, VaultStatCards } from "src/types/types";

export interface VaultsSlice {
    transactionCurrency: SelectableAsset;
    depositValues: DepositValues;
    withdrawValues: WithdrawValues;
    vaultStats: VaultStatCards;
    vaultDescription: string;
    hedgingStrategy: Array<{
        name: string;
        value: string;
    }>
    spotStrategy: Array<{
        name: string;
        value: string;
    }>


}

const initialState:VaultsSlice={
    transactionCurrency: "WETH",
    depositValues: {
        depositAmount: 0,
        depositInputError: null,
    },
    withdrawValues: {
        withdrawAmount: 0,
        withdrawInputError: null,
        balance: {
            'WETH': 0,
            'USDC': 0,
            'WBTC': 0,
        }
    },
    vaultStats : [
        {
            name: "LTV",
            value: "loading...",
        },
        {
            name: "Unrealized Profit",
            value: "loading...",
        },
        {
            name: "Realized Profit",
            value: "loading...",
        },
        {
            name: "Delta",
            value: "loading...",
        },
    ],
    vaultDescription: "loading...",
    hedgingStrategy: [
        {
            name: 'Stat1',
            value: 'loading...'
        },
        {
            name: 'Stat2',
            value: 'loading...'
        },
    ],
    spotStrategy: [
        {
            name: 'Stat1',
            value: 'loading...'
        },
        {
            name: 'Stat2',
            value: 'loading...'
        },
    ],

}

//generate a test slice that count clicks
export const vaultsSlice = createSlice({
    name: 'vaults',
    initialState,
    reducers: {
        setVaults: (state, action: PayloadAction<object>) => {
            for (const [key,value] of Object.entries(action.payload)){
                state = {
                    ...state,
                    [key]:value
                }
            }
            return state;
        },
        setTransactionCurrency: (state, action: PayloadAction<SelectableAsset>) => {
            state.transactionCurrency = action.payload;
        },
        setDepositValues: (state, action: PayloadAction<DepositValues>) => {
            state.depositValues = action.payload;
        },
        setWithdrawValues: (state, action: PayloadAction<WithdrawValues>) => {
            state.withdrawValues = action.payload;
        },
        setVaultStats: (state, action: PayloadAction<VaultStatCards>) => {
            state.vaultStats = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.vaultDescription = action.payload;
        },
        setHedgingStrategy: (state, action: PayloadAction<Array<{
            name: string;
            value: string;
        }>>) => {
            state.hedgingStrategy = action.payload;
        },
        setSpotStrategy: (state, action: PayloadAction<Array<{
            name: string;
            value: string;
        }>>) => {
            state.spotStrategy = action.payload;
        },
        setUserBalance: (state, action: PayloadAction<{
            'WETH': number;
            'USDC': number;
            'WBTC': number;
        }>) => {
            state.withdrawValues.balance = action.payload;
        }
    }
});

//export the actions and reducer
export const {
    setVaults,
    setTransactionCurrency,
    setDepositValues,
    setWithdrawValues,
    setVaultStats,
    setDescription,
    setHedgingStrategy,
    setSpotStrategy,
    setUserBalance,
} = vaultsSlice.actions;
export const selectVaults = (state: RootState) => state.vaults;
export default vaultsSlice.reducer;
