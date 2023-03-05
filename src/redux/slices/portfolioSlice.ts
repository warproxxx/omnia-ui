import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/app/store";
import { SelectableAsset, StatCards, WithdrawValues,DepositValues, VaultStatCards, PortfolioLoans } from "src/types/types";

export interface PortfolioSlice {
    activeLoans : PortfolioLoans;
    inactiveLoans: PortfolioLoans;
}

const initialState:PortfolioSlice={
    activeLoans : [],
    inactiveLoans: []
}

//generate a test slice that count clicks
export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setportfolio: (state, action: PayloadAction<object>) => {
            for (const [key,value] of Object.entries(action.payload)){
                state = {
                    ...state,
                    [key]:value
                }
            }
            return state;
        },
        setActiveLoans: (state, action: PayloadAction<PortfolioLoans>) => {
            state.activeLoans = action.payload;
        },
        setInactiveLoans: (state, action: PayloadAction<PortfolioLoans>) => {
            state.inactiveLoans = action.payload;
        }
    }
});

//export the actions and reducer
export const {
    setportfolio,
    setActiveLoans,
    setInactiveLoans
} = portfolioSlice.actions;
export const selectPortfolio = (state: RootState) => state.portfolio;
export default portfolioSlice.reducer;
