import Head from "next/head";
import { Box, Typography, Card, styled } from "@mui/material";
import { useState, useEffect, useCallback, useMemo } from "react";
import Layout from "src/components/nav/Layout";

import { useAccount } from "wagmi";

import { useAppSelector } from "@/redux/app/hooks";
import { useAppDispatch } from "@/redux/app/hooks";
import {
    setportfolio,
    setActiveLoans,
    setInactiveLoans
} from 'src/redux/slices/portfolioSlice'

//@ts-ignore
import MUIDataTable from "mui-datatables";
import { LoadingButton } from "@mui/lab";

import { PortfolioLoans } from "@/types/types";

import useContractHelper from "@/hooks/useContractHelper";

import { watchBlockNumber } from "@wagmi/core";

import { useSigner } from "wagmi";

import { setStatus } from '@/redux/slices/transactionSlice'


const StyledTokenImage = styled(Box,{
})<{
    src: string;
    component: string;
}>(({ theme }) => ({
    height: "20px",
    width: "20px",
}));


const PortfolioPage = () => {
    const account = useAccount();
    const {data : signer} = useSigner();
    const [transactionLoading, setTransactionLoading] = useState(false);

    const dispatch = useAppDispatch();
    const address = account?.address;
    
    const { activeLoans : active_loans, inactiveLoans : inactive_loans } = useAppSelector((state) => state.portfolio);

    const { WETH : WETHApproval, 
        WBTC : WBTCApproval, 
        USDC : USDCApproval,
        shares : sharesApproval,
        ERC1155 : ERC1155Approval
    } =  useAppSelector((state) => state.approval);


    const contractHelper = useContractHelper();
    const getPortfolio = contractHelper?.getPortfolio;
    const payLoan = contractHelper?.payLoan;
    const approveToken = contractHelper?.approveToken;

    const active_loans_columns = [{
        name: "Token",
        options: {
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                return (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}>
                        {value === 'WBTC' ? <StyledTokenImage component="img" src="/icons/btc.svg"/> : void(0)}
                        {value === 'WETH' ? <StyledTokenImage component="img" src="/icons/eth.svg"/> : void(0)}
                        {value === 'USDC' ? <StyledTokenImage component="img" src="/icons/usdc.svg"/> : void(0)}
                        <Typography variant="body1">
                            {value}
                        </Typography>
                    </Box>
                );
            }
        }
    }, "Loan Id", "Loan Amount", "Repayment Amount", "Burrow Date", "Duration", "Days Remaining", {
        name: "Action",
        options: {
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                return (
                    <LoadingButton 
                        loading={transactionLoading}
                        loadingPosition="start"
                        variant="contained"
                        onClick={async() => {
                            if(!payLoan) return;
                            if(!approveToken) return;
                            const token = tableMeta.rowData[0];
                            const tokenApprovalResult = await approveToken(token);
                            const ERC1155ApprovalResult = await approveToken('ERC1155');
                            if(!tokenApprovalResult || !ERC1155ApprovalResult) return;
                            setTransactionLoading(true);
                            const result = await payLoan(tableMeta.rowData);
                            if(!result){
                                dispatch(setStatus("error"));
                            }
                            setTransactionLoading(false);
                        }}
                        >
                        {"Pay"}
                    </LoadingButton>
                );
            }
        }
    }];
    const inactive_loans_columns = [{
        name: "Token",
        options: {
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                return (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}>
                        {value === 'WBTC' ? <StyledTokenImage component="img" src="/icons/btc.svg"/> : void(0)}
                        {value === 'WETH' ? <StyledTokenImage component="img" src="/icons/eth.svg"/> : void(0)}
                        {value === 'USDC' ? <StyledTokenImage component="img" src="/icons/usdc.svg"/> : void(0)}
                        <Typography variant="body1">
                            {value}
                        </Typography>
                    </Box>
                );
            }
        }
    }, "Loan Amount", "Repayment Amount", "Burrow Date", "Duration", "Loan End Date", "Status"];
    
    const options = {
        selectableRowsHideCheckboxes: true,
        filterType: "checkbox",
        pagination: false,
        selectableRows: "none",
        viewColumns: false,
        responsive: 'standard'
    };


    useEffect(() => {
        async function getPortfolioAsync() {
            if(getPortfolio){
                const portfolio = await getPortfolio();
                dispatch(setActiveLoans(portfolio.activeLoans));
                dispatch(setInactiveLoans(portfolio.inactiveLoans));
            }
        }

        const unwatchBlockNumber = watchBlockNumber(
            {
                listen: true,
            },
            async () => {
                await getPortfolioAsync();
            }
        );
        
        getPortfolioAsync();

        return () => {
            unwatchBlockNumber();
        }


    }, [dispatch,signer]);


    return (
        <>
            <Head>
                <title>OMNIA | portfolio</title>
            </Head>
            <Box>
                {!address ? (
                    <Typography variant="h4" sx={{ textAlign: "center", mt: 5 }}>
                        Connect your wallet to view your portfolio
                    </Typography>
                ) : (
                    <Box sx={{
                        gap: 2,
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <Box
                            sx={{
                                gap: 1,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography variant="h3" color="text.secondary">
                                Current Loans
                            </Typography>
                            <Card>
                                <Box
                                    sx={{
                                        padding: 1,
                                        gap: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        "& .MuiPaper-root": {
                                            backgroundColor: "#00000000",
                                            backgroundImage: "none !important",
                                            boxShadow: "none !important",
                                        },
                                        "& .MuiToolbar-root": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    <MUIDataTable title={"Employee List"} data={active_loans} columns={active_loans_columns} options={options} />
                                </Box>
                            </Card>
                        </Box>
                        <Box
                            sx={{
                                gap: 1,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* <Typography variant="h3" color="text.secondary">
                                Past Loans
                            </Typography>
                            <Card>
                                <Box
                                    sx={{
                                        padding: 1,
                                        gap: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        "& .MuiPaper-root": {
                                            backgroundColor: "#00000000",
                                            backgroundImage: "none !important",
                                            boxShadow: "none !important",
                                        },
                                        "& .MuiToolbar-root": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    <MUIDataTable title={"Employee List"} data={inactive_loans} columns={inactive_loans_columns} options={options}/>
                                </Box>
                            </Card> */}
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

PortfolioPage.getLayout = (page: any) => <Layout>{page}</Layout>;

export default PortfolioPage;
