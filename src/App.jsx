import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CoinDetailPage from "./pages/CoinDetailPage";
import CoinSummaryPage from "./pages/CoinSummaryPage";
import Header from "./components/Header";
import "./App.css"; 

const App = () => {
  return (
    <div className="container"> 
        <BrowserRouter> 
          <Header />
          <Route exact path="/" component={CoinSummaryPage} />
          <Route path="/coins/:id/:symbol" component={CoinDetailPage} />
        </BrowserRouter> 
    </div>
  );
};

export default App;
