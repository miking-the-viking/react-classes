import { TickerApi } from '@react-classes/api';
import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { Ticker } from '../TickerData.interface';
import TickerInput from './TickerInput';
import TickerTable from './TickerTable';
import Col from 'react-bootstrap/Col';

console.log(process.env);
const token = process.env['NX_API_TOKEN'];

if (!token) throw Error('Missing API_TOKEN');

const tickerApi = new TickerApi(token);

type StockQuoteContentProps = {
  load: (ticker: string) => void;
  loading: boolean;
  data: Ticker;
};

const StockQuoteContent: React.FC<StockQuoteContentProps> = ({
  data,
  load,
  loading,
}) => {
  return (
    <Row>
      <Col sm={12}>
        <h1>Stock Data</h1>
      </Col>

      <Col sm={12}>
        <TickerInput onSubmit={load} />
      </Col>
      <Col sm={12}>
        {loading ? (
          <Spinner animation="grow" />
        ) : (
          <TickerTable data={data ? [data] : []} />
        )}
      </Col>
    </Row>
  );
};

// Equivalent Functional Component with Hooks compared to the Class Component
const StockQuoteFunctionalComponent: React.FC = () => {
  const { data, load, loading } = tickerApi.useGetTicker();
  return <StockQuoteContent {...{ data, loading, load }} />;
};

class StockQuoteClassBased extends React.Component<
  { setData: (data: any) => void },
  { data: any; loading: boolean }
> {
  private unmounting!: boolean;
  constructor(props: any) {
    super(props);
    this.state = { data: null, loading: false };
  }

  submit = (ticker: string) => {
    (async () => {
      this.setState((prev) => ({ ...prev, loading: true }));

      try {
        const tickerInformation = await tickerApi.getTicker(ticker);
        if (!tickerInformation) return;
        console.log('got ticker data,  updating state', tickerInformation);
        this.setState((prev) => ({
          data: tickerInformation ?? null,
          loading: false,
        }));
        if (this.unmounting) return;
        this.props.setData(tickerInformation);
      } catch (e) {
        console.log('There was an issue: ', e);
      }

      this.setState((prev) => ({ ...prev, loading: false }));
    })();
  };

  componentDidMount() {
    console.log('component did mount', this.state);
    this.unmounting = false;
  }

  componentWillUnmount() {
    console.log('component will unmount', this.state);
    this.unmounting = true;
  }

  componentDidUpdate() {
    console.log('component did update', this.state);
  }

  render() {
    return (
      <>
        <h1>Sample React StockQuote</h1>
        <StockQuoteContent
          data={this.state.data}
          load={this.submit}
          loading={this.state.loading}
        />
      </>
    );
  }
}

export default StockQuoteClassBased;
