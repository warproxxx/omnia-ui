import { Box, Card, Typography, styled } from "@mui/material";
import {useState, useEffect} from "react";

import { SelectableAsset } from "@/types/types";


import Chart from "./Chart";

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

interface CustomChartProps {
    exchangeAsset1: SelectableAsset;
    exchangeAsset2: SelectableAsset;
}

const CustomChart = ({
    exchangeAsset1,
    exchangeAsset2,
}: CustomChartProps
) => {
    const [chartPoint, setCharPoint] = useState('0');

    const onPlotMoveSetPoint = (point: string) => {
        setCharPoint(point);
    };

    const [chartXAxis, setChartXAxis] = useState<"1W" | "1M" | "6M" | "1Y">("1W");

    return(
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
        }}
    >
        <Typography
            variant="h3"
            sx={{
                color: "text.secondary",
            }}
        >
            {exchangeAsset1} to {exchangeAsset2} chart
        </Typography>
        <Card>
            <Box
                sx={{
                    padding: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h4">{chartPoint}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 0.5,
                        }}
                    >
                        <StyledTypography active={
                            chartXAxis === "1W" ? "true" : "false"
                        } onClick={()=>{
                            setChartXAxis("1W")
                        }}>1W</StyledTypography>
                        <StyledTypography active={
                            chartXAxis === "1M" ? "true" : "false"
                        } onClick={()=>{
                            setChartXAxis("1M")
                        }}>1M</StyledTypography>
                        <StyledTypography active={
                            chartXAxis === "6M" ? "true" : "false"
                        } onClick={()=>{
                            setChartXAxis("6M")
                        }}>6M</StyledTypography>
                        <StyledTypography active={
                            chartXAxis === "1Y" ? "true" : "false"
                        } onClick={()=>{
                            setChartXAxis("1Y")
                        }}>1Y</StyledTypography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        height: "400px",
                    }}
                >
                    <Chart onPlotMoveSetPoint={onPlotMoveSetPoint} exchangeAsset1={exchangeAsset1} exchangeAsset2={exchangeAsset2} chartXAxis={chartXAxis}/>
                </Box>
            </Box>
        </Card>
    </Box>
    )
}

export default CustomChart;