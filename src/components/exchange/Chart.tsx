import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import useTheme from "@/utils/theme";

import { SelectableAsset } from "@/types/types";

import { useEffect, useState } from "react";

import { setChartData } from "@/redux/slices/exchangeSlice";
import { useAppDispatch,useAppSelector } from "@/redux/app/hooks";

interface ChartProps {
    exchangeAsset1: SelectableAsset;
    exchangeAsset2: SelectableAsset;
    onPlotMoveSetPoint: (point: string) => void;
    chartXAxis: "1W" | "1M" | "6M" | "1Y";
}

const Chart = ({ exchangeAsset1, exchangeAsset2, onPlotMoveSetPoint, chartXAxis }: ChartProps) => {


    const charData = useAppSelector((state) => state.exchange.charData);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (charData.length > 0) {
            onPlotMoveSetPoint(charData[charData.length - 1].exchangeRate + " " + charData[charData.length - 1].date);
        }
    }, [charData]);



    useEffect(() => {
        async function fetchData() {
            let exchangeAsset1InUrl = ""
            let exchangeAsset2InUrl = ""
            let shouldReverse = false;

            if (exchangeAsset1 === "WETH" && exchangeAsset2 === "WBTC") {
                exchangeAsset1InUrl = "ETH";
                exchangeAsset2InUrl = "XBT";
                shouldReverse = false;
            }
            else if (exchangeAsset1 === "WBTC" && exchangeAsset2 === "WETH") {
                exchangeAsset1InUrl = "ETH";
                exchangeAsset2InUrl = "XBT";
                shouldReverse = true;
            }
            else if (exchangeAsset1 === "WETH" && exchangeAsset2 === "USDC") {
                exchangeAsset1InUrl = "ETH";
                exchangeAsset2InUrl = "USD";
                shouldReverse = false;
            }
            else if (exchangeAsset1 === "USDC" && exchangeAsset2 === "WETH") {
                exchangeAsset1InUrl = "ETH";
                exchangeAsset2InUrl = "USD";
                shouldReverse = true;
            } 
            else if (exchangeAsset1 === "WBTC" && exchangeAsset2 === "USDC") {
                exchangeAsset1InUrl = "XBT";
                exchangeAsset2InUrl = "USD";
                shouldReverse = false;
            }
            else if (exchangeAsset1 === "USDC" && exchangeAsset2 === "WBTC") {
                exchangeAsset1InUrl = "XBT";
                exchangeAsset2InUrl = "USD";
                shouldReverse = true;
            }

            let duration = 7;

            if(chartXAxis === '1W'){
                duration = 7;
            }
            else if(chartXAxis === '1M'){
                duration = 30;
            }
            else if(chartXAxis === '6M'){
                duration = 180;
            }
            else if(chartXAxis === '1Y'){
                duration = 365;
            }


            const url = `https://api.kraken.com/0/public/OHLC?pair=${exchangeAsset1InUrl}${exchangeAsset2InUrl}&interval=1440`;
            const json = await fetch(url);
            const res_data = await json.json();

            const result = res_data.result;

            const array = Object.values(result)[0] as any[];

            const last7Days = array.slice(array.length - duration, array.length);
            const last7DaysFormatted = last7Days.map((item: any,index:number) => {
                return {
                    value: index,
                    exchangeRate: shouldReverse ? Number(1 / item[4]).toFixed(9) : Number(item[4]),
                    date: new Date(item[0] * 1000).toLocaleDateString("en-US"),
                };
            });
            dispatch(setChartData(last7DaysFormatted));
        }
        fetchData();
    }, [exchangeAsset1,exchangeAsset2,chartXAxis]); // Or [] if effect doesn't need props or state


    const findMaximum = (data: any) => {
        let max = 0;
        data.forEach((item: any) => {
            if (item.exchangeRate > max) max = item.exchangeRate;
        });
        return max * 1.01;
    };

    const findMinimum = (data: any) => {
        let min = 1000000;
        data.forEach((item: any) => {
            if (item.exchangeRate < min) min = item.exchangeRate;
        });
        return min * 0.99;
    };

    const theme = useTheme();

    if(charData.length == 0)
        return (<div>loading...</div>)



    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={300}
                height={100}
                data={charData}
                onMouseMove={(e) => {
                    if (!e) return;
                    const activePayload = e.activePayload;
                    if (!activePayload || activePayload.length == 0) return;
                    onPlotMoveSetPoint(activePayload[0].payload.exchangeRate + " " + activePayload[0].payload.date)
                }}
            >
                <Line type="monotone" dataKey="exchangeRate" stroke={theme.palette.primary.main} strokeWidth={2} dot={false} />
                <XAxis dataKey="date" domain={['auto', 'auto']} interval={
                    chartXAxis === '1W' ? 0 :
                    chartXAxis === '1M' ? 4 :
                    chartXAxis === '6M' ? 25 :
                    chartXAxis === '1Y' ? 52 : 0
                } />
                <YAxis domain={[findMinimum(charData), findMaximum(charData)]} axisLine={false} tick={false}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
