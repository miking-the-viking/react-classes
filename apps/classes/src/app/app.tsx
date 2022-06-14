import React from 'react';
import StockQuote from './components/StockQuote';
import TickerTable from './components/TickerTable';
import { Ticker } from './TickerData.interface';

type AppState = {
  showStockQuote: boolean;
  data: Ticker[] | null;
};

class AppClassBased extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { showStockQuote: true, data: null };
    this.toggleShowStockQuote = this.toggleShowStockQuote.bind(this);
  }

  toggleShowStockQuote() {
    this.setState((prev) => ({ showStockQuote: !prev.showStockQuote }));
  }

  render() {
    return (
      <>
        <button onClick={this.toggleShowStockQuote}>
          Toggle Show Stock Quote to:{' '}
          {JSON.stringify(!this.state.showStockQuote)}
        </button>
        {this.state.showStockQuote && (
          <>
            <StockQuote
              setData={(data) => {
                console.log('setData running');
                this.setState((prev) => {
                  return {
                    ...prev,
                    data: prev.data ? [...prev.data, data] : [data],
                  };
                });
              }}
            />
            <hr />
          </>
        )}
        {this.state.data && (
          <>
            <h1>Historical Calls</h1>
            <TickerTable data={this.state.data} />
          </>
        )}
      </>
    );
  }
}

export default AppClassBased;
