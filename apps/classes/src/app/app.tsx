import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import StockQuote from './components/StockQuote';
import TickerTable from './components/TickerTable';
import store, { RootState } from './store/store';
import { Ticker } from './TickerData.interface';
import { add } from './store/tickerSlice';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type AppState = {
  showStockQuote: boolean;
};

const stateToProps = (state: RootState) => {
  const tickers = state.ticker.data;
  return { data: tickers };
};

const mapDispatch = (dispatch: typeof store.dispatch) => {
  return {
    add: (payload: Ticker) => dispatch(add(payload)),
  };
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
    return (
      <Container fluid>
        <Row>
          <Col>
            <Button onClick={this.toggleShowStockQuote}>
              Toggle Show Stock Quote to:{' '}
              {JSON.stringify(!this.state.showStockQuote)}
            </Button>
          </Col>
        </Row>

        {this.state.showStockQuote && (
          <Row>
            <Col>
              <StockQuote
                setData={(data) => {
                  this.props.add(data);
                }}
              />
            </Col>
          </Row>
        )}
        {this.props.data && (
          <Row>
            <hr />
            <Col xs={12}>
              <h1>Historical Calls</h1>
            </Col>
            <Col xs={12}>
              <TickerTable data={this.props.data} />
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default connector(AppClassBased);
