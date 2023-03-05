import { SelectableAsset } from './../../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/app/store";
import { UserBalance } from "src/types/types";

export interface ApprovalSlice {
    loaded: boolean;
    WETH: boolean;
    WBTC: boolean;
    USDC: boolean;
    shares: boolean;
    ERC1155: boolean;

    currentTokenForApproval?: SelectableAsset | 'shares' | 'ERC1155' | undefined;
}

const initialState:ApprovalSlice={
    loaded: false,
    WETH: false,
    WBTC: false,
    USDC: false,
    shares: false,
    ERC1155: false,

    currentTokenForApproval: undefined
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
        },
        setSharesApproval : (state, action: PayloadAction<boolean>) => {
            state.shares = action.payload;
        },
        setERC1155Approval : (state, action: PayloadAction<boolean>) => {
            state.ERC1155 = action.payload;
        },
        setCurrentTokenForApproval : (state, action: PayloadAction<SelectableAsset | 'shares' | 'ERC1155'| undefined>) => {
            state.currentTokenForApproval = action.payload;
        }
    },
});

//export the actions and reducer
export const {
    setApproval,
    setLoaded,
    setWETHApproval,
    setWBTCApproval,
    setUSDCApproval,
    setSharesApproval,
    setERC1155Approval,
    setCurrentTokenForApproval
} = approvalSlice.actions;
export const selectApproval = (state: RootState) => state.approval;
export default approvalSlice.reducer;
