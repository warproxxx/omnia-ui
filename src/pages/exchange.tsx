import Head from "next/head";
import { useAppSelector } from "@/redux/app/hooks";
import { useAppDispatch } from "@/redux/app/hooks";
import { Box, Card, styled, Typography, Select, MenuItem, TextField, InputAdornment, ListItemIcon, ListSubheader } from "@mui/material";
import Layout from "src/components/nav/Layout";
import { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
// import WrappedDatePicker from "@/components/exchange/WrappedDatePicker";

import CustomChart from "@/components/exchange/CustomChart";

import { BorrowValues, SelectableAsset, StatCards as StatCardsType, SwapValues } from "src/types/types";

import AssetSelection from "src/components/exchange/AssetSelection";
import StatCards from "@/components/exchange/StatCards";

import { useAccount } from "wagmi";

import {
    setExchange,
    setexchangeAsset1 as reduxSetExchangeAsset1,
    setexchangeAsset2 as reduxSetExchangeAsset2,
    setExchangeStats,
    setSwapValues as reduxSetSwapValues,
    setBorrowValues as reduxSetBorrowValues,
} from "src/redux/slices/exchangeSlice";

import useContractHelper from "@/hooks/useContractHelper";
import { useSigner } from "wagmi";
import { watchBlockNumber } from "@wagmi/core";

import { setStatus } from '@/redux/slices/transactionSlice'
import { calculateBorrowValuesForCallateral, calculateSwapValuesForAsset1, calculateSwapValuesForAsset2 } from "@/utils/calcualtion";

const StyledTypography = styled(Typography)<{
    active?: string;
}>((props: { active?: string; theme: any }) => {
    const { theme } = props;
    return {
        backgroundColor: "none",
        color: props.active === "true" ? theme.palette.primary.main : theme.palette.common.white,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "unset",
            color: theme.palette.primary.light,
        },
    };
});

function ExchanePage() {
    const { data: signer } = useSigner();
    const dispatch = useAppDispatch();
    const { exchangeAsset1, exchangeAsset2, exchangeStats, swapValues, borrowValues, charData } = useAppSelector((state) => state.exchange);
    const setExchangeAsset1 = (asset: SelectableAsset) => {
        dispatch(reduxSetExchangeAsset1(asset));
    };
    const setExchangeAsset2 = (asset: SelectableAsset) => {
        dispatch(reduxSetExchangeAsset2(asset));
    };
    const setSwapValues = (values: SwapValues) => {
        dispatch(reduxSetSwapValues(values));
    };
    const setBorrowValues = (values: BorrowValues) => {
        dispatch(reduxSetBorrowValues(values));
    };

    const [tradeOrBorrow, setTradeOrBorrow] = useState<"trade" | "borrow">("trade");

    const [transactionLoading, setTransactionLoading] = useState<boolean>(false);

    const { address } = useAccount();

    const contractHelper = useContractHelper();
    const getExchangeStatsFromBlockchain = contractHelper?.getExchangeStats;
    const handleBorrow = contractHelper?.handleBorrow;
    const handleSwap = contractHelper?.handleSwap;
    const approveToken =  contractHelper?.approveToken;
    const getBorrowValuesApr = contractHelper?.getBorrowValuesApr;


    useEffect(() => {
        async function getExchangeStatsFromBlockchainAsync() {
            if (getExchangeStatsFromBlockchain) {

                let newExchangeStats = []
                for (let i = 0; i < exchangeStats.length; i++) {
                    newExchangeStats.push({
                        name: exchangeStats[i].name,
                        value: "Loading...",
                    })
                }
                dispatch(setExchangeStats(newExchangeStats));

                const newExchangeStats1 = await getExchangeStatsFromBlockchain(exchangeAsset1, exchangeAsset2, newExchangeStats);
                dispatch(setExchangeStats(newExchangeStats1));
            }
        }

        async function getBorrowValuesAprAsync() {
            if(getBorrowValuesApr) {
                const apr = await getBorrowValuesApr();
                setBorrowValues({
                    ...borrowValues,
                    apr: apr,
                });
            }
        }

        // const unwatchBlockNumber = watchBlockNumber(
        //     {
        //         listen: true,
        //     },
        //     async () => {
        //         await getExchangeStatsFromBlockchainAsync();
        //     }
        // );

        getExchangeStatsFromBlockchainAsync();
        getBorrowValuesAprAsync();

        // return () => {
        //     unwatchBlockNumber();
        // }

    }, [dispatch, exchangeAsset1, exchangeAsset2]);


    const disbaledSwap = !address || exchangeAsset2 !== "USDC";
    useEffect(() => {
        if (exchangeAsset2 !== "USDC") {
            setBorrowValues({
                ...borrowValues,
                inputError: "Only USDC is supported for colladeral",
            });
        } else {
            setBorrowValues({
                ...borrowValues,
                inputError: "",
            });
        }
    }, [exchangeAsset2]);

    return (
        <>
            <Head>
                <title>OMNIA | Exchange</title>
            </Head>
            <Box
                component="main"
                sx={{
                    display: "flex",
                    // flexDirection: "row",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        gap: 2,
                        // width:'60%'
                    }}
                >
                    <AssetSelection
                        exchangeAsset1={exchangeAsset1}
                        exchangeAsset2={exchangeAsset2}
                        setExchangeAsset1={setExchangeAsset1}
                        setExchangeAsset2={setExchangeAsset2}
                    />
                    <StatCards exchangeAsset1={exchangeAsset1} exchangeAsset2={exchangeAsset2} exchangeStats={exchangeStats} />
                    <CustomChart exchangeAsset1={exchangeAsset1} exchangeAsset2={exchangeAsset2} />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                    }}
                >
                    <Typography variant="h3" sx={{ color: "text.secondary" }}>
                        {exchangeAsset1} to {exchangeAsset2} exchange
                    </Typography>
                    <Card>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                padding: 1,
                                gap: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                }}
                            >
                                <StyledTypography
                                    active={(tradeOrBorrow === "trade").toString()}
                                    onClick={() => {
                                        setTradeOrBorrow("trade");
                                    }}
                                >
                                    Swap
                                </StyledTypography>
                                <StyledTypography
                                    active={(tradeOrBorrow === "borrow").toString()}
                                    onClick={() => {
                                        setTradeOrBorrow("borrow");
                                    }}
                                >
                                    Borrow
                                </StyledTypography>
                            </Box>
                            {tradeOrBorrow === "trade" ? (
                                <Box
                                    sx={{
                                        boxShadow: "0px 0px 8px 2px #feda6a60",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 2,
                                        mx: "auto",
                                        padding: 1,
                                        width: "50%",
                                        minWidth: "360px",
                                        gap: 1,
                                    }}
                                >
                                    <Typography variant="h5">
                                        Swap {exchangeAsset1} for {exchangeAsset2}
                                    </Typography>
                                    <Box>
                                        <TextField
                                            variant="filled"
                                            fullWidth
                                            color="primary"
                                            type="number"
                                            label={exchangeAsset1}
                                            value={swapValues.asset1}
                                            onChange={(e) => {

                                                const asset1 = Number(e.target.value);
                                                const currency1 = exchangeAsset1;
                                                const currency2 = exchangeAsset2;
                                                const asset2 = calculateSwapValuesForAsset1(asset1, currency1, currency2);

                                                setSwapValues({
                                                    ...swapValues,
                                                    asset1: e.target.value,
                                                    asset2: asset2
                                                });
                                                
                                            }}
                                        />

                                        <TextField
                                            variant="filled"
                                            fullWidth
                                            type="number"
                                            color="primary"
                                            label={exchangeAsset2}
                                            value={swapValues.asset2}
                                            onChange={(e) => {

                                                const asset2 = Number(e.target.value);
                                                const currency1 = exchangeAsset1;
                                                const currency2 = exchangeAsset2;
                                                const asset1 = calculateSwapValuesForAsset2(asset2, currency1, currency2);

                                                setSwapValues({
                                                    ...swapValues,
                                                    asset1: asset1,
                                                    asset2: e.target.value,
                                                });

                                            }}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography color="error" variant="body1">
                                            {swapValues.inputError}
                                        </Typography>

                                        <LoadingButton
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 0.3,
                                                backgroundColor: "primary.main",
                                                color: "primary.contrastText",
                                                "&:hover": {
                                                    backgroundColor: "primary.dark",
                                                },
                                                typography: "h5",
                                                "&:disabled": {
                                                    color: "common.white",
                                                },
                                                py: 0.3,
                                            }}
                                            disabled={address ? false : true}
                                            loading={transactionLoading}
                                            loadingPosition="start"
                                            onClick={ async ()=>{
                                                if(!handleSwap) return;
                                                if(!approveToken) return;
                                                const token = exchangeAsset1;
                                                const tokenApprovalResult = await approveToken(token);
                                                if(!tokenApprovalResult) return;
                                                
                                                const organizedSwapValues = {
                                                    exchangeAsset1,
                                                    exchangeAsset2,
                                                    ...swapValues
                                                }
                                                setTransactionLoading(true);
                                                const result = await handleSwap(organizedSwapValues);
                                                if(!result) dispatch(setStatus("error"));
                                                setTransactionLoading(false);
                                            }}
                                        >
                                            {transactionLoading ? "Continue in wallet" : "Swap"}
                                        </LoadingButton>
                                    </Box>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        boxShadow: "0px 0px 8px 2px #feda6a60",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 2,
                                        mx: "auto",
                                        padding: 1,
                                        width: "50%",
                                        minWidth: "360px",
                                        gap: 0.5,
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 0.5,
                                        }}
                                    >
                                        Borrow {exchangeAsset1} for {exchangeAsset2}
                                    </Typography>

                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        type="number"
                                        color="primary"
                                        label={"Collateral"}
                                        placeholder={"100"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{exchangeAsset2}</InputAdornment>,
                                        }}
                                        value={borrowValues.callateral}
                                        onChange={(e) => {
                                            const collateral = Number(e.target.value);
                                            const currency1 = exchangeAsset1;
                                            const currency2 = exchangeAsset2;
                                            const duration = borrowValues.duration;
                                            const number_duration = Number(duration.split(" ")[0]);
                                            const borrowAmount = calculateBorrowValuesForCallateral(collateral, currency2, currency1,number_duration);



                                            setBorrowValues({
                                                ...borrowValues,
                                                callateral: e.target.value,
                                                borrowAmount: borrowAmount
                                            });
                                        }}
                                    />
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        type="number"
                                        color="primary"
                                        label={"borrow amount"}
                                        placeholder={"0"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{exchangeAsset1}</InputAdornment>,
                                        }}
                                        value={borrowValues.borrowAmount}
                                        onChange={(e) => {
                                            setBorrowValues({
                                                ...borrowValues,
                                                borrowAmount: e.target.value,
                                            });
                                        }}
                                    />

                                    {/* <WrappedDatePicker value={borrowValues.expiryDate} onChange={
                                        (date) => {
                                            setBorrowValues({
                                                ...borrowValues,
                                                expiryDate: date
                                            })
                                        }
                                    }/> */}

                                    <TextField
                                        value={borrowValues.duration}
                                        variant="filled"
                                        label="Duration"
                                        select
                                        onChange={(e) => {
                                            setBorrowValues({
                                                ...borrowValues,
                                                duration: e.target.value,
                                            });
                                        }}
                                    >
                                        <MenuItem
                                            value={"7"}
                                            sx={{
                                                typography: "body1",
                                            }}
                                        >
                                            7 days
                                        </MenuItem>
                                        <MenuItem
                                            value={"30"}
                                            sx={{
                                                typography: "body1",
                                            }}
                                        >
                                            30 days
                                        </MenuItem>
                                        <MenuItem
                                            value={"90"}
                                            sx={{
                                                typography: "body1",
                                            }}
                                        >
                                            90 days
                                        </MenuItem>
                                    </TextField>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mt: 0.5,
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ mr: 1 }}>
                                            APR
                                        </Typography>
                                        <Typography variant="body1">{borrowValues.apr} %</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mt: 0.5,
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ mr: 1 }}>
                                            Return Amount:
                                        </Typography>
                                        <Typography variant="h4" color="primary.main">
                                            {borrowValues.returnAmount} {exchangeAsset2}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Typography color="error" variant="body1">
                                                {borrowValues.inputError}
                                            </Typography>
                                        </Box>

                                        <LoadingButton
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 0.3,
                                                backgroundColor: "primary.main",
                                                color: "primary.contrastText",
                                                "&:hover": {
                                                    backgroundColor: "primary.dark",
                                                },
                                                typography: "h5",
                                                "&:disabled": {
                                                    color: "common.white",
                                                },
                                                py: 0.3,
                                            }}
                                            disabled={disbaledSwap}
                                            loading={transactionLoading}
                                            loadingPosition="start"
                                            onClick={async ()=>{
                                                if(!handleBorrow) return;
                                                if(!approveToken) return;
                                                const token = exchangeAsset1;
                                                const tokenApprovalResult = await approveToken(token);
                                                if(!tokenApprovalResult) return;

                                                const organizedBorrowValues = {
                                                    ...borrowValues,
                                                    exchangeAsset1,
                                                    exchangeAsset2,
                                                }
                                                setTransactionLoading(true);
                                                const result = await handleBorrow(organizedBorrowValues);
                                                if(!result) dispatch(setStatus("error"));
                                                setTransactionLoading(false);
                                            }}
                                        >
                                            {transactionLoading ? "Continue in wallet" : "Borrow"}
                                        </LoadingButton>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Card>
                </Box>
            </Box>
        </>
    );
}

ExchanePage.getLayout = (page: any) => <Layout>{page}</Layout>;

export default ExchanePage;