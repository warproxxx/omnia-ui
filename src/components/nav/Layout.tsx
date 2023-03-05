import NavBar from "src/components/nav/NavBar";
import { Box } from "@mui/material";

import ApprovalModal from "src/components/general/ApproveModal";

import TransactionFailedSnackbar from "src/components/general/TransactionFailedSnackBar";

import { useAppSelector } from "@/redux/app/hooks";
import { useAppDispatch } from "@/redux/app/hooks";

import { useState, useEffect } from "react";

import { setLoaded, setWETHApproval, setWBTCApproval, setUSDCApproval, setSharesApproval, setERC1155Approval } from "@/redux/slices/approvalSlice";
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
    const checkSharesApproval = contractHelper?.checkSharesApproval;
    const checkERC1155Approval = contractHelper?.checkERC1155Approval;

    const checkWETHBalance = contractHelper?.checkWETHBalance;
    const checkWBTCBalance = contractHelper?.checkWBTCBalance;
    const checkUSDCBalance = contractHelper?.checkUSDCBalance;
    const checkSharesBalance = contractHelper?.checkSharesBalance;
    const checkERC1155Balance = contractHelper?.checkERC1155Balance;

    const getTestTokens = contractHelper?.getTestTokens;

    useEffect(() => {
        if (status === "error") {
            setOpen(true);
        }
    }, [status]);

    useEffect(() => {
        async function getTokenApprovals() {
            if (checkWETHApproval && checkWBTCApproval && checkUSDCApproval && checkSharesApproval && checkERC1155Approval) {
                const wethApproval = await checkWETHApproval();
                const wbtcApproval = await checkWBTCApproval();
                const usdcApproval = await checkUSDCApproval();
                const sharesApproval = await checkSharesApproval();
                const erc1155Approval = await checkERC1155Approval();

                dispatch(setWETHApproval(wethApproval));
                dispatch(setWBTCApproval(wbtcApproval));
                dispatch(setUSDCApproval(usdcApproval));
                dispatch(setSharesApproval(sharesApproval));
                dispatch(setERC1155Approval(erc1155Approval));
                dispatch(setLoaded(true));
            }
        }
        getTokenApprovals();
    }, [dispatch, signer]);

    useEffect(() => {
        async function getBalances() {
            if (checkWETHBalance && checkWBTCBalance && checkUSDCBalance && checkSharesBalance && checkERC1155Balance) {
                const WETHBalance = await checkWETHBalance();
                const WBTCBalance = await checkWBTCBalance();
                const USDCBalance = await checkUSDCBalance();
                const sharesBalance = await checkSharesBalance();
                const ERC1155Balance = await checkERC1155Balance();


                const balance: UserBalance = {
                    WETH: WETHBalance as number,
                    WBTC: WBTCBalance as number,
                    USDC: USDCBalance as number,
                    shares: sharesBalance,
                    ERC1155: ERC1155Balance,
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
            <NavBar getTestTokens={getTestTokens}/>
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
            <ApprovalModal/>
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
