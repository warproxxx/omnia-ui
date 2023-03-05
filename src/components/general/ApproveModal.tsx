import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useAppSelector, useAppDispatch } from "@/redux/app/hooks";

import useContractHelper from "@/hooks/useContractHelper";

import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";

import { setCurrentTokenForApproval } from "@/redux/slices/approvalSlice";

import { setStatus } from '@/redux/slices/transactionSlice'

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
    display: "flex",
    flexDirection: "column",
    gap: 1,
};

export default function ApprovalModal() {
    const [open, setOpen] = React.useState(false);
    const [transactionLoading, setTransactionLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        dispatch(setCurrentTokenForApproval(undefined));
    };

    const contractHelper = useContractHelper();
    const approveWETH = contractHelper?.approveWETH;
    const approveWBTC = contractHelper?.approveWBTC;
    const approveUSDC = contractHelper?.approveUSDC;
    const approveShares = contractHelper?.approveShares;
    const approveERC1155 = contractHelper?.approveERC1155;

    const { currentTokenForApproval: approvalToken } = useAppSelector((state) => state.approval);

    useEffect(() => {
        if (approvalToken) {
            handleOpen();
        }
    }, [approvalToken]);

    return (
        <Box>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h5">
                            {`Approve your ${approvalToken}`}
                        </Typography>

                        <Typography
                            onClick={handleClose}
                            variant="body1"
                            sx={{
                                typography: "h5",
                                color: "error.main",
                                cursor: "pointer",
                                fontWeight: 700,

                                "&:hover": {
                                    color: "error.dark",
                                },
                            }}
                        >
                            X
                        </Typography>
                    </Box>

                    <Typography id="modal-modal-description" variant="body1">
                        You only have to do this once. This allows the OMNIA contract to handle your {approvalToken} for you.
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
                        loading={transactionLoading}
                        loadingPosition="start"
                        onClick={async () => {
                            if(!approveWETH || !approveWBTC || !approveUSDC || !approveShares || !approveERC1155) return;
                            setTransactionLoading(true);
                            let aprpovalFunction = null;
                            switch (approvalToken) {
                                case "WETH":
                                    aprpovalFunction = approveWETH;
                                    break;
                                case "WBTC":
                                    aprpovalFunction = approveWBTC;
                                    break;
                                case "USDC":
                                    aprpovalFunction = approveUSDC;
                                    break;
                                case "shares":
                                    aprpovalFunction = approveShares;
                                    break;
                                case "ERC1155":
                                    aprpovalFunction = approveERC1155;
                                    break;
                                default:
                                    break;
                            }
                            if (aprpovalFunction) {
                                const result = await aprpovalFunction();
                                setTransactionLoading(false);
                                if(result){
                                    handleClose();
                                }
                                else{
                                    dispatch(setStatus("error"))
                                }

                            }
                        }}
                    >
                        {transactionLoading ? "Continue in wallet" : "Approve"}
                    </LoadingButton>
                </Box>
            </Modal>
        </Box>
    );
}
