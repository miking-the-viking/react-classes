import { TickerApi } from '@react-classes/api';
import React from 'react';
import TickerInput from './TickerInput';

console.log(process.env);
const token = process.env['NX_API_TOKEN'];

if (!token) throw Error('Missing API_TOKEN');

const tickerApi = new TickerApi(token);

type StockQuoteContentProps = {
  load: (ticker: string) => void;
  loading: boolean;
  data: any;
};

const StockQuoteContent: React.FC<StockQuoteContentProps> = ({
  data,
  load,
  loading,
}) => {
  return (
    <div>
      <h1>Stock Data</h1>
      <TickerInput onSubmit={load} />
      {loading && <div>Loading...</div>}
      <h1>{data && JSON.stringify(data, null, '\n')}</h1>
    </div>
  );
};

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
    this.submit = this.submit.bind(this);
    this.state = { data: null, loading: false };
  }

  submit(ticker: string) {
    (async () => {
      this.setState((prev) => ({ ...prev, loading: true }));

      try {
        const tickerInformation = await tickerApi.getTicker(ticker);
        console.log('got ticker data,  updating state', tickerInformation);
        this.setState({
          data: tickerInformation,
          loading: false,
        });
        if (this.unmounting) return;
        this.props.setData(tickerInformation);
      } catch (e) {
        console.log('There was an issue: ', e);
      }

      this.setState((prev) => ({ ...prev, loading: false }));
    })();
  }

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
