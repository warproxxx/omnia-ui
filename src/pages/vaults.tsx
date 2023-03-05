import Head from "next/head";
import Layout from "src/components/nav/Layout";

import StatCards from "src/components/vaults/StatCards";

import { Box, Typography, Card, styled, Button, TextField, InputAdornment, MenuItem, ListItemIcon, Select } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import CustomChart from "@/components/vaults/CustomChart";
import { useState, useEffect } from "react";

import { SelectableAsset, WithdrawValues, DepositValues, VaultStatCards } from "@/types/types";

import { useAccount } from "wagmi";

import { useAppSelector } from "@/redux/app/hooks";
import { useAppDispatch } from "@/redux/app/hooks";
import {
    setVaults as reduxSetVaults,
    setTransactionCurrency as reduxSetTransactionCurrency,
    setDepositValues as reduxSetDepositValues,
    setWithdrawValues as reduxSetWithdrawValues,
    setVaultStats,
    setDescription,
    setHedgingStrategy,
    setSpotStrategy,
    setUserBalance,
} from "src/redux/slices/vaultsSlice";

import useContractHelper from "@/hooks/useContractHelper";
import { useSigner } from "wagmi";
import { watchBlockNumber } from "@wagmi/core";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { setStatus } from '@/redux/slices/transactionSlice'

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

const VaultsPage = () => {
    const { data: signer } = useSigner();
    const [aboutOrStrategies, setAboutOrStrategies] = useState<"about" | "strategies">("about");
    const [depositOrWithdraw, setDepositOrWithdraw] = useState<"deposit" | "withdraw">("deposit");

    const dispatch = useAppDispatch();
    const { transactionCurrency, depositValues, withdrawValues, vaultStats, vaultDescription, hedgingStrategy, spotStrategy } = useAppSelector(
        (state) => state.vaults
    );

    const setTransactionCurrency = (currency: SelectableAsset) => {
        dispatch(reduxSetTransactionCurrency(currency));
    };
    const setDepositValues = (values: DepositValues) => {
        dispatch(reduxSetDepositValues(values));
    };
    const setWithdrawValues = (values: WithdrawValues) => {
        dispatch(reduxSetWithdrawValues(values));
    };

    const contractHelper = useContractHelper();
    const getVaultStats = contractHelper?.getVaultStats;
    const getVaultDescription = contractHelper?.getVaultDescription;
    const getHedgingStrategy = contractHelper?.getHedgingStrategy;
    const getSpotStrategy = contractHelper?.getSpotStrategy;
    const handleDeposit = contractHelper?.handleDeposit;
    const handleWithdraw = contractHelper?.handleWithdraw;
    const approveToken = contractHelper?.approveToken;
    const getUserBalance = contractHelper?.getUserBalance;

    useEffect(() => {
        async function getVaultStatsAsync() {
            if (getVaultStats) {
                const exchangeStats = await getVaultStats();
                dispatch(setVaultStats(exchangeStats));
            }
        }
        async function getVaultDescriptionAsync() {
            if (getVaultDescription) {
                const description = await getVaultDescription();
                dispatch(setDescription(description));
            }
        }

        async function getHedgingStrategyAsync() {
            if (getHedgingStrategy) {
                const strategy = await getHedgingStrategy();
                dispatch(setHedgingStrategy(strategy));
            }
        }

        async function getSpotStrategyAsync() {
            if (getSpotStrategy) {
                const strategy = await getSpotStrategy();
                dispatch(setSpotStrategy(strategy));
            }
        }

        async function getUserBalanceAsync() {
            if(getUserBalance){
                const balance = await getUserBalance();
                dispatch(setUserBalance(balance));
            }
        }

        const unwatchBlockNumber = watchBlockNumber(
            {
                listen: true,
            },
            async () => {
                await getVaultStatsAsync();
                await getUserBalanceAsync();
            }
        );

        getVaultDescriptionAsync();
        getVaultStatsAsync();
        getHedgingStrategyAsync();
        getSpotStrategyAsync();
        getUserBalanceAsync();

        return () => {
            unwatchBlockNumber();
            
        };
    }, [dispatch, signer]);

    const { address } = useAccount();

    const [transactionLoading, setTransactionLoading] = useState<boolean>(false);

    return (
        <>
            <Head>
                <title>OMNIA | Vaults</title>
            </Head>
            <Box
                sx={{
                    gap: 2,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <StatCards vaultStats={vaultStats} />
                <Box
                    sx={{
                        gap: 0.5,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h3" color="text.secondary">
                        Vault Details
                    </Typography>
                    <Card>
                        <Box
                            sx={{
                                padding: 1,
                                gap: 1,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 0.5,
                                }}
                            >
                                <StyledTypography
                                    active={aboutOrStrategies === "about" ? "true" : "false"}
                                    onClick={() => setAboutOrStrategies("about")}
                                >
                                    About
                                </StyledTypography>
                                <StyledTypography
                                    active={aboutOrStrategies === "strategies" ? "true" : "false"}
                                    onClick={() => setAboutOrStrategies("strategies")}
                                >
                                    Strtegies
                                </StyledTypography>
                            </Box>
                            {aboutOrStrategies === "about" ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 0.5,
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography variant="h4" color="text.secondary">
                                            Description
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: "100%",
                                            }}
                                        >
                                            <Typography variant="body1" color="text.primary">
                                                {vaultDescription}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <CustomChart />
                                    </Box>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 0.5,
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography variant="h4" color="text.secondary">
                                            Hedging Strategy
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 0.5,
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 0.5,
                                                }}
                                            >
                                                {hedgingStrategy.map((strategy, index) => {
                                                    return (
                                                        <Box key={index} sx={{ width: "100%" }}>
                                                            <TextField
                                                                label={strategy.name}
                                                                value={strategy.value}
                                                                variant="filled"
                                                                fullWidth
                                                                type="number"
                                                                onChange={(e) => {
                                                                    const newStrategy = [...hedgingStrategy];
                                                                    const newStrategyItem = { ...newStrategy[index] };
                                                                    newStrategyItem.value = e.target.value;
                                                                    newStrategy[index] = newStrategyItem;
                                                                    dispatch(setHedgingStrategy(newStrategy));
                                                                }}
                                                            />
                                                        </Box>
                                                    );
                                                })}
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 0.5,
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography variant="h4" color="text.secondary">
                                            Spot Strategy
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 0.5,
                                            }}
                                        >
                                            {spotStrategy.map((strategy, index) => {
                                                return (
                                                    <Box key={index} sx={{ width: "100%" }}>
                                                        <TextField
                                                            label={strategy.name}
                                                            value={strategy.value}
                                                            variant="filled"
                                                            fullWidth
                                                            type="number"
                                                            onChange={(e) => {
                                                                const newStrategy = [...spotStrategy];
                                                                const newStrategyItem = { ...newStrategy[index] };
                                                                newStrategyItem.value = e.target.value;
                                                                newStrategy[index] = newStrategyItem;
                                                                dispatch(setSpotStrategy(newStrategy));
                                                            }}
                                                        />
                                                    </Box>
                                                );
                                            })}
                                        </Box>
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
                                        disabled={address ? false : true}
                                        onClick={() => {
                                            console.log(`setting new strategy ${JSON.stringify(hedgingStrategy)} ${JSON.stringify(spotStrategy)}`);
                                        }}
                                        loading={transactionLoading}
                                        loadingPosition="start"
                                    >
                                        {transactionLoading ? "Continue in wallet" : "Set New Strategy"}
                                    </LoadingButton>
                                </Box>
                            )}
                        </Box>
                    </Card>
                </Box>

                <Box
                    sx={{
                        gap: 0.5,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h3" color="text.secondary">
                        Transaction
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
                                    active={(depositOrWithdraw === "deposit").toString()}
                                    onClick={() => {
                                        setDepositOrWithdraw("deposit");
                                    }}
                                >
                                    Deposit
                                </StyledTypography>
                                <StyledTypography
                                    active={(depositOrWithdraw === "withdraw").toString()}
                                    onClick={() => {
                                        setDepositOrWithdraw("withdraw");
                                    }}
                                >
                                    WithDraw
                                </StyledTypography>
                            </Box>
                            {depositOrWithdraw === "deposit" ? (
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 0.5,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography variant="h3">Deposit</Typography>

                                        <Select
                                            variant="standard"
                                            disableUnderline
                                            value={transactionCurrency}
                                            onChange={(e) => {
                                                setTransactionCurrency(e.target.value as SelectableAsset);
                                            }}
                                            sx={{
                                                "& .MuiSelect-select": {
                                                    color: "text.primary",
                                                    typography: "h4",
                                                    width: "fit-content",
                                                },
                                            }}
                                        >
                                            <MenuItem
                                                value={"WETH"}
                                                sx={{
                                                    display: transactionCurrency === "WETH" ? "none" : "block",
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Box component={"img"} src={"/icons/eth.svg"} sx={{ width: 30, height: 30 }} />
                                                    <Typography variant="h4">WETH</Typography>
                                                </ListItemIcon>
                                            </MenuItem>

                                            <MenuItem
                                                value={"WBTC"}
                                                sx={{
                                                    display: transactionCurrency === "WBTC" ? "none" : "block",
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Box component={"img"} src={"/icons/btc.svg"} sx={{ width: 30, height: 30 }} />
                                                    <Typography variant="h4">WBTC</Typography>
                                                </ListItemIcon>
                                            </MenuItem>

                                            <MenuItem
                                                value={"USDC"}
                                                sx={{
                                                    display: transactionCurrency === "USDC" ? "none" : "block",
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Box component={"img"} src={"/icons/usdc.svg"} sx={{ width: 30, height: 30 }} />
                                                    <Typography variant="h4">USDC</Typography>
                                                </ListItemIcon>
                                            </MenuItem>
                                        </Select>
                                    </Box>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        type="number"
                                        color="primary"
                                        placeholder={"0"}
                                        label="deposit amount"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{transactionCurrency}</InputAdornment>,
                                        }}
                                        value={depositValues.depositAmount}
                                        onChange={(e) => {
                                            setDepositValues({
                                                ...depositValues,
                                                depositAmount: e.target.value,
                                            });
                                        }}
                                    />

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
                                            {depositValues.depositInputError}
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
                                            onClick={async () => {
                                                if(!approveToken) return;
                                                if(!handleDeposit) return;
                                                const token = transactionCurrency;
                                                const tokenApprovalResult = await approveToken(token);
                                                if(!tokenApprovalResult) return;


                                                setTransactionLoading(true);
                                                const organizedDepositValues = {
                                                    ...depositValues,
                                                    transactionCurrency
                                                }
                                                const result = await handleDeposit(organizedDepositValues);
                                                if(!result) dispatch(setStatus("error"));
                                                setTransactionLoading(false);
                                            }}
                                            loading={transactionLoading}
                                            loadingPosition="start"
                                        >
                                            {transactionLoading ? "Continue in wallet" : "Deposit"}
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
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 0.5,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography variant="h3">Withdraw</Typography>

                                        <Select
                                            variant="standard"
                                            disableUnderline
                                            value={transactionCurrency}
                                            onChange={(e) => {
                                                setTransactionCurrency(e.target.value as SelectableAsset);
                                            }}
                                            sx={{
                                                "& .MuiSelect-select": {
                                                    color: "text.primary",
                                                    typography: "h4",
                                                    width: "fit-content",
                                                },
                                            }}
                                        >
                                            <MenuItem
                                                value={"WETH"}
                                                sx={{
                                                    display: transactionCurrency === "WETH" ? "none" : "block",
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Box component={"img"} src={"/icons/eth.svg"} sx={{ width: 30, height: 30 }} />
                                                    <Typography variant="h4">WETH</Typography>
                                                </ListItemIcon>
                                            </MenuItem>

                                            <MenuItem
                                                value={"WBTC"}
                                                sx={{
                                                    display: transactionCurrency === "WBTC" ? "none" : "block",
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Box component={"img"} src={"/icons/btc.svg"} sx={{ width: 30, height: 30 }} />
                                                    <Typography variant="h4">WBTC</Typography>
                                                </ListItemIcon>
                                            </MenuItem>

                                            <MenuItem
                                                value={"USDC"}
                                                sx={{
                                                    display: transactionCurrency === "USDC" ? "none" : "block",
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Box component={"img"} src={"/icons/usdc.svg"} sx={{ width: 30, height: 30 }} />
                                                    <Typography variant="h4">USDC</Typography>
                                                </ListItemIcon>
                                            </MenuItem>
                                        </Select>
                                    </Box>

                                    <Box sx={{
                                        display:'flex',
                                        justifyContent:'space-between',
                                    }}>
                                        <Typography variant="body1">{`${transactionCurrency} withdrable balance`}:</Typography>
                                        <Typography variant="body1">{withdrawValues.balance[transactionCurrency]}</Typography>
                                    </Box>

                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        type="number"
                                        color="primary"
                                        placeholder={"0"}
                                        label="withdraw amount"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{transactionCurrency}</InputAdornment>,
                                        }}
                                        value={withdrawValues.withdrawAmount}
                                        onChange={(e) => {
                                            setWithdrawValues({
                                                ...withdrawValues,
                                                withdrawAmount: e.target.value,
                                            });
                                        }}
                                    />

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
                                            {withdrawValues.withdrawInputError}
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
                                            onClick={async () => {
                                                if(!handleWithdraw) return;
                                                if(!approveToken) return;
                                                const token = 'shares';
                                                const tokenApprovalResult = await approveToken(token);
                                                if(!tokenApprovalResult) return;

                                                const organizedWithdrawValues = {
                                                    ...withdrawValues,
                                                    transactionCurrency
                                                }
                                                setTransactionLoading(true);
                                                const result = await handleWithdraw(organizedWithdrawValues);
                                                if(!result) dispatch(setStatus("error"));
                                                setTransactionLoading(false);
                                            }}
                                            loading={transactionLoading}
                                            loadingPosition="start"
                                        >
                                            {transactionLoading ? "Continue in wallet" : "withdraw"}
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
};

VaultsPage.getLayout = (page: any) => <Layout>{page}</Layout>;

export default VaultsPage;
