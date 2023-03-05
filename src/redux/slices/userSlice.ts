import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/app/store";
import { UserBalance } from "src/types/types";




export interface UserSlice {
    balance : UserBalance;

}

const initialState:UserSlice={
    balance : {
        USDC: 0,
        WETH: 0,
        WBTC: 0,
        shares: 0,
        ERC1155: 0
    }
}

//generate a test slice that count clicks
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<object>) => {
            for (const [key,value] of Object.entries(action.payload)){
                state = {
                    ...state,
                    [key]:value
                }
            }
            return state;
        },
        setBalance : (state, action: PayloadAction<UserBalance>) => {
            state.balance = action.payload;
        }     
    },
});

//export the actions and reducer
export const {
    setUser,
    setBalance
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
