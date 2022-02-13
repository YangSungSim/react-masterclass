import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { getValueTransition } from "framer-motion/types/animation/utils/transitions";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
    time_open: string;
    time_close:string;
    open: number;
    high: number;
    low: number;
    close:number;
    volume:number;
    market_cap: number;
}
interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId], ()=> fetchCoinHistory(coinId));

    return <div>{isLoading ? "loading chart..." : <ApexChart type="candlestick" 
    series={[
        {
            name:"Price",
            data: data?.map((price) => 
               [price.time_close,price.open, price.high, price.low, price.close]
            )
        }
    ]}
    options={{ 
        theme:{
            mode:false ? "dark": "light",
        },
        chart : {
        height: 500,
        width: 500,
        toolbar: {
            show:false,
        },
        background: "transparent",
        },
        stroke: {
            curve: "smooth",
            width: 5,
        },
        yaxis: {
            show:false
        },
        xaxis: {
            axisBorder: {show: false},
            axisTicks : {show:false},
            labels: {show: false},
            type:"datetime",
            categories: data?.map((price) => price.time_close)
        },
        plotOptions : {
            candlestick  :{
                wick : {
                    useFillColor: true,
                },
                colors : {
                    upward : '#3C90EB',
                    downward: '#DF7D46'
                }
            }
        }
    }} />}</div>;
}

export default Chart;