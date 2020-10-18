import React, { useEffect, useState, useContext } from "react";
import coinGecko from "../apis/coinGecko"; 
import Coin from "./Coin";

const CoinList = () => {
  const [value, setValue] = useState("");
  const [coins, setCoins] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
          ids: ""
        },
      });
      setCoins(response.data);
      console.log(response.data)
      setIsLoading(false);
    }; 
      fetchData(); 
  }, []);

  const renderCoins = () => {
    if (isLoading) {
      return <div className="text-danger">Loading...</div>;
    }

    return (
      <ul className="coinlist list-group mt-2" style={{color:'lightgrey'}}>
        <div className="md-form active-cyan active-cyan-2 mb-3"> 
                <input class="form-control" aria-label="Search"
                type="text"
                placeholder="Search..."
                value={value}
                onChange={e => setValue(e.target.value.toLowerCase())}
            />
            </div>
        {coins.filter(item => {
                if (!value) return true;
                if (item.name.toLowerCase().includes(value)|| item.symbol.toLowerCase().includes(value)) {
                    return true;
                }
                return false;
            }).map((coin) => {
          return <Coin key={coin.id} coin={coin} />;
        })}
      </ul>
    );
  };

  return <div>{renderCoins()}</div>;
};

export default CoinList;
