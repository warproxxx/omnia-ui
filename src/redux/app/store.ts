import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { exchangeSlice } from "src/redux/slices/exchangeSlice";
import { vaultsSlice } from "src/redux/slices/vaultsSlice";
import { portfolioSlice } from "../slices/portfolioSlice";
import { userSlice } from "../slices/userSlice";
import { transactionSlice } from "../slices/transactionSlice";
import { approvalSlice } from "../slices/approvalSlice";

export const store = configureStore({
    reducer: {
        exchange: exchangeSlice.reducer,
        vaults: vaultsSlice.reducer,
        portfolio: portfolioSlice.reducer,
        user: userSlice.reducer,
        transaction: transactionSlice.reducer,
        approval: approvalSlice.reducer,
    },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
