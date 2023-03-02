import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/app/store";
import { UserBalance } from "src/types/types";

export interface ApprovalSlice {
    loaded: boolean;
    WETH: boolean;
    WBTC: boolean;
    USDC: boolean;
}

const initialState:ApprovalSlice={
    loaded: false,
    WETH: false,
    WBTC: false,
    USDC: false,
}

//generate a test slice that count clicks
export const approvalSlice = createSlice({
    name: 'approval',
    initialState,
    reducers: {
        setApproval: (state, action: PayloadAction<object>) => {
            for (const [key,value] of Object.entries(action.payload)){
                state = {
                    ...state,
                    [key]:value
                }
            }
            return state;
        },
        setLoaded : (state, action: PayloadAction<boolean>) => {
            state.loaded = action.payload;
        },
        setWETHApproval : (state, action: PayloadAction<boolean>) => {
            state.WETH = action.payload;
        },
        setWBTCApproval : (state, action: PayloadAction<boolean>) => {
            state.WBTC = action.payload;
        },
        setUSDCApproval : (state, action: PayloadAction<boolean>) => {
            state.USDC = action.payload;
        }
    },
});

//export the actions and reducer
export const {
    setApproval,
    setLoaded,
    setWETHApproval,
    setWBTCApproval,
    setUSDCApproval
} = approvalSlice.actions;
export const selectUser = (state: RootState) => state.approval;
export default approvalSlice.reducer;
