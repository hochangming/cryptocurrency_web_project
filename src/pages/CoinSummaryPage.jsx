import React from "react"; 
import CoinList from "../components/CoinList";
import {Link} from 'react-router-dom'
const CoinSummaryPage = () => {
  return (
    <div className="coinsummary shadow border p-2 rounded mt-2 bg-light "> 
    
      <CoinList />
    </div>
  );
};

export default CoinSummaryPage;
