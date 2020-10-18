import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import CoinData from "../components/CoinData";
import coinGecko from "../apis/coinGecko";
import ApexChart from "./Apex";
import Axios from "axios";
import cryptocompare from '../apis/cryptocompare';
require('dotenv').config();
const CoinDetailPage = () => {
  const { id } = useParams();
  const {symbol} = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };
  const formatData1 = (data) => {  
    return data.map((el) => {
      return {
        x: new Date(el[0]),
        y: [el[1].toFixed(2), el[2].toFixed(2), el[3].toFixed(2),  el[4].toFixed(2)], 
      };
    });
  };
  const formatData2 = (data) => {  
    return data.map((el) => {
      return {
        x: new Date(parseInt(''+el.time+'000')),
        y: [el.open.toFixed(2), el.high.toFixed(2), el.low.toFixed(2),  el.close.toFixed(2)],
      };
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail, dayChart, weekChart, yearChart, minute,hour1,hour4] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: "usd",
            ids: id,
          },
        }),
        coinGecko.get(`/coins/${id}/ohlc`,{
          params: {
            vs_currency: "usd",
            days: "1"
          }
        }),
        coinGecko.get(`/coins/${id}/ohlc`,{
          params: {
            vs_currency: "usd",
            days: "7"
          }
        }),
        coinGecko.get(`/coins/${id}/ohlc`,{
          params: {
            vs_currency: "usd",
            days: "365"
          }
        }),
        cryptocompare.get(`/histominute?fsym=${symbol}&tsym=USD&limit=100&aggregate=1`,
        {
          authorization: process.env.REACT_APP_API_KEY
        }),
        cryptocompare.get(`/histohour?fsym=${symbol}&tsym=USD&limit=100&aggregate=1`,
        {
          authorization: process.env.REACT_APP_API_KEY
        }),
        cryptocompare.get(`/histohour?fsym=${symbol}&tsym=USD&limit=100&aggregate=4`,
        {
          authorization: process.env.REACT_APP_API_KEY
        }),
      ]);
      console.log(hour1.data.Data.Data);
      console.log(dayChart.data);
      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
        dayChart: formatData1(dayChart.data),
        weekChart: formatData1(weekChart.data),
        yearChart: formatData1(yearChart.data),
        minute: formatData2(minute.data.Data.Data),
        hour1:formatData2(hour1.data.Data.Data),
        hour4:formatData2(hour4.data.Data.Data),

      }); 
      setIsLoading(false); 
    }; 
    fetchData();
  }, []);

  const renderData = () => {
    if (isLoading) {
      return <div className="text-danger">Loading....</div>;
    }
    console.log(coinData) 
    return (
      <div className="coinlist">  
        <ApexChart data={coinData}></ApexChart>
        <CoinData data={coinData.detail} />
      </div>
    );
  }; 

  return renderData();
};

export default CoinDetailPage;
