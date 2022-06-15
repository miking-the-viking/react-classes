import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import StockQuote from './components/StockQuote';
import TickerTable from './components/TickerTable';
import { useAppDispatch, useAppSelector } from './store/store';
import { add } from './store/tickerSlice';

const App2: React.FC = () => {
  const [showStockQuote, setShowStockQuote] = useState(true);

  const data = useAppSelector((state) => state.ticker.data);
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        onClick={() => {
          setShowStockQuote((prev) => !prev);
        }}
      >
        Toggle Show Stock Quote to: {JSON.stringify(!showStockQuote)}
      </Button>

      {showStockQuote && (
        <>
          <StockQuote
            setData={(data) => {
              dispatch(add(data));
            }}
          />
          <hr />
        </>
      )}
      {data && (
        <>
          <h1>Historical Calls</h1>
          <TickerTable data={data} />
        </>
      )}
    </>
  );
};

export default App2;
