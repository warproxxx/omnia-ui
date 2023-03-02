import NavBar from "src/components/nav/NavBar";
import { Box } from "@mui/material";

import ApprovalModal from "src/components/general/ApproveModal";

import TransactionFailedSnackbar from "src/components/general/TransactionFailedSnackBar";

import { useAppSelector } from "@/redux/app/hooks";
import { useAppDispatch } from "@/redux/app/hooks";

import { useState, useEffect } from "react";

import { setLoaded, setWETHApproval, setWBTCApproval, setUSDCApproval } from "@/redux/slices/approvalSlice";
import { setBalance } from "@/redux/slices/userSlice";

import useContractHelper from "@/hooks/useContractHelper";
import { UserBalance } from "@/types/types";

import { watchBlockNumber } from "@wagmi/core";

import {useSigner} from "wagmi";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const {data: signer} = useSigner();

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const { status } = useAppSelector((state) => state.transaction);
    const contractHelper = useContractHelper();

    const checkWETHApproval = contractHelper?.checkWETHApproval;
    const checkWBTCApproval = contractHelper?.checkWBTCApproval;
    const checkUSDCApproval = contractHelper?.checkUSDCApproval;

    const checkWETHBalance = contractHelper?.checkWETHBalance;
    const checkWBTCBalance = contractHelper?.checkWBTCBalance;
    const checkUSDCBalance = contractHelper?.checkUSDCBalance;

    useEffect(() => {
        if (status === "error") {
            setOpen(true);
        }
    }, [status]);

    useEffect(() => {
        async function getTokenApprovals() {
            if (checkWETHApproval && checkWBTCApproval && checkUSDCApproval) {
                const wethApproval = await checkWETHApproval();
                const wbtcApproval = await checkWBTCApproval();
                const usdcApproval = await checkUSDCApproval();

                dispatch(setWETHApproval(wethApproval));
                dispatch(setWBTCApproval(wbtcApproval));
                dispatch(setUSDCApproval(usdcApproval));
                dispatch(setLoaded(true));
            }
        }
        getTokenApprovals();
    }, [dispatch, signer]);

    useEffect(() => {
        async function getBalances() {
            if (checkWETHBalance && checkWBTCBalance && checkUSDCBalance) {
                const WETHBalance = await checkWETHBalance();
                const WBTCBalance = await checkWBTCBalance();
                const USDCBalance = await checkUSDCBalance();

                const balance: UserBalance = {
                    WETH: WETHBalance,
                    WBTC: WBTCBalance,
                    USDC: USDCBalance,
                };
                dispatch(setBalance(balance));
            }
        }

        const unwatchBlockNumber = watchBlockNumber(
            {
                listen: true,
            },
            async () => {
                await getBalances();
            }
        );

        getBalances();

        return () => {
            unwatchBlockNumber();
        }
    }, [dispatch, signer]);



    return (
        <Box
            id="OMNIA"
            sx={{
                backgroundColor: "background.default",
            }}
        >
            <NavBar />
            <Box
                sx={{
                    mx: 3,
                    my: 1,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "1420px",
                }}
            >
                {children}
            </Box>
            {/* <ApprovalModal/> */}
            <TransactionFailedSnackbar
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            />
        </Box>
    );
};

export default Layout;
