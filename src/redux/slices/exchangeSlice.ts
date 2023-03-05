import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/app/store";
import { SelectableAsset, StatCards, SwapValues, BorrowValues } from "src/types/types";

export interface ExchangeSlice {
    exchangeAsset1 : SelectableAsset;
    exchangeAsset2 : SelectableAsset;
    exchangeStats: StatCards;
    swapValues: {
        asset1: number | string;
        asset2: number | string;
        inputError: string | null;
    }
    borrowValues: {
        callateral: number | string;
        borrowAmount: number | string;
        returnAmount: number;
        duration: string;
        inputError: string | null;
        apr: number | string;
    }
    charData : Array<any>;
}

const initialState:ExchangeSlice={
    exchangeAsset1 : "WETH",
    exchangeAsset2 : "USDC",
    exchangeStats: [
            {
                name: "24 Hour Volume",
                value: "loading...",
            },
            {
                name: "24 Hour % Change",
                value: "loading...",
            },   
            {
                name: "24 Hour Changes",
                value: "loading...",
            },
            {
                name: "Total Volume",
                value: "loading...",
            },   
            {
                name: "Ciculating Supply",
                value: "loading...",
            },    
            {
                name: "Market Cap",
                value: "loading...",
            }

        ],
    swapValues: {
        asset1: 0,
        asset2: 0,
        inputError: null,
    },
    borrowValues: {
        callateral: 0,
        borrowAmount: 0,
        returnAmount: 0,
        duration: '7',
        inputError: null,
        apr: 0
    },
    charData: []
}

//generate a test slice that count clicks
export const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {
        setExchange: (state, action: PayloadAction<object>) => {
            for (const [key,value] of Object.entries(action.payload)){
                state = {
                    ...state,
                    [key]:value
                }
            }
            return state;
        },
        setexchangeAsset1 : (state, action: PayloadAction<SelectableAsset>) => {
            state.exchangeAsset1 = action.payload;
        },
        setexchangeAsset2 : (state, action: PayloadAction<SelectableAsset>) => {
            state.exchangeAsset2 = action.payload;
        },
        setExchangeStats : (state, action: PayloadAction<StatCards>) => {
            state.exchangeStats = action.payload;
        },
        setSwapValues : (state, action: PayloadAction<SwapValues>) => {
            state.swapValues = action.payload;
        },
        setBorrowValues : (state, action: PayloadAction<BorrowValues>) => {
            state.borrowValues = action.payload;
        },
        setChartData : (state, action: PayloadAction<Array<any>>) => {
            state.charData = action.payload;
        },
        setReturnAmount: (state, action: PayloadAction<number>) => {
            state.borrowValues.returnAmount = action.payload;
        },
        setApr : (state, action: PayloadAction<number>) => {
            state.borrowValues.apr = action.payload;
        }


    }
});

//export the actions and reducer
export const {setExchange,setexchangeAsset1,setexchangeAsset2,setExchangeStats,setSwapValues,setBorrowValues,setChartData,setReturnAmount,setApr  } = exchangeSlice.actions;
export const selectExchange = (state: RootState) => state.exchange;
export default exchangeSlice.reducer;
