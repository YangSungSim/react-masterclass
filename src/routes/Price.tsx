import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchCoinHistory } from "./api";
import styled from "styled-components";
import { useTable } from "react-table"; 
import { useMemo } from "react";


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

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const CoinsList = styled.ul`

`;

const Coin = styled.li`
    background-color: white;
    border-radius: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    color: black;
`;

function Price({ coinId }: ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv2", coinId], ()=> fetchCoinHistory(coinId));
            
    return <Container>
   {isLoading ? (
       <Loader>Loading...</Loader>
   ) : (
   <CoinsList>
       {data?.slice(0,100).map((coin) => (
       <Coin key={coin.time_open}>
               {coin.close}
       </Coin>
       ))
       } 
   </CoinsList>)}
</Container>;
}

export default Price;