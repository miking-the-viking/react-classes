import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import StockQuote from './components/StockQuote';
import TickerTable from './components/TickerTable';
import { RootState } from './store';
import { Ticker } from './TickerData.interface';

type AppState = {
  showStockQuote: boolean;
};

const stateToProps = (state: RootState) => {
  const tickers = state.ticker.data;
  return { data: tickers };
};

const mapDispatch = {
  add: (payload: Ticker) => ({ type: 'add', payload }),
};

const connector = connect(stateToProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

class AppClassBased extends React.Component<PropsFromRedux, AppState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = { showStockQuote: true };
    this.toggleShowStockQuote = this.toggleShowStockQuote.bind(this);
  }

  toggleShowStockQuote() {
    this.setState((prev) => ({ showStockQuote: !prev.showStockQuote }));
  }

  render() {
    console.log('props: ', this.props);
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
                this.props.add(data);
              }}
            />
            <hr />
          </>
        )}
        {true && (
          <>
            <h1>Historical Calls</h1>
            <TickerTable data={[]} />
          </>
        )}
      </>
    );
  }
}

export default connector(AppClassBased);
