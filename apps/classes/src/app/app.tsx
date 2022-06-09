import React from 'react';
import StockQuote from './components/StockQuote';

type AppState = {
  showStockQuote: boolean;
  data: null;
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
                this.setState((prev) => ({ ...prev, data }));
              }}
            />
            <hr />
          </>
        )}
        <h1>
          {this.state.data && JSON.stringify(this.state.data, null, '\n')}
        </h1>
      </>
    );
  }
}

export default AppClassBased;
