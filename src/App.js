import { number } from "prop-types";
import { useEffect, useState } from "react";
import style from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState("");
  const [coinId, setCoinId] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setCoinId(json[0]?.id || "");
        setLoading(false);
      });
  }, []);

  const coinSelect = coins.find((coin) => coin.id === coinId);

  return (
    <div className={style.container}>
      <div className={style.nav}>
        <span>💰</span>
        <h1>Which coin do you want to buy?</h1>
        <select
          onChange={(event) => setCoinId(event.target.value)}
          value={coinId}
        >
          {coins.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div className={style.box}>
          <div className={style.firstBox}>
            <input
              type="number"
              placeholder="Type your USD here !"
              value={usd}
              onChange={(event) => setUsd(event.target.value)}
            />
            <div>USD</div>
          </div>

          <div className={style.secondBox}>
            {coinSelect && usd >= 0 ? (
              <div>
                {(usd / coinSelect.quotes.USD.price).toFixed(6)}{" "}
                {coinSelect.symbol}
              </div>
            ) : (
              <div>0</div>
            )}
            <div>{coinSelect ? coinSelect.symbol : ""}</div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
