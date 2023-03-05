import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/app/store";
import { TransactionStatus } from "src/types/types";

export interface TransactionSlice {
    status: TransactionStatus;
    message: string | null;
    txHash: string | null;
}

const initialState:TransactionSlice={
    status: null,
    message: null,
    txHash: null,
}

//generate a test slice that count clicks
export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransaction: (state, action: PayloadAction<object>) => {
            for (const [key,value] of Object.entries(action.payload)){
                state = {
                    ...state,
                    [key]:value
                }
            }
            return state;
        }, 
        setStatus : (state, action: PayloadAction<TransactionStatus>) => {
            state.status = action.payload;
        },
        setMessage : (state, action: PayloadAction<string|null>) => {
            state.message = action.payload;
        },
        setTxHash : (state, action: PayloadAction<string|null>) => {
            state.txHash = action.payload;
        }
    },
});

//export the actions and reducer
export const {
    setTransaction,
    setStatus,
    setMessage,
    setTxHash
} = transactionSlice.actions;
export const selectTransaction = (state: RootState) => state.transaction;
export default transactionSlice.reducer;
