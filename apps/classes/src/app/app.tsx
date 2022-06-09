import { TickerApi } from '@react-classes/api';
import React from 'react';
import TickerInput from './components/TickerInput';

console.log(process.env);
const token = process.env['NX_API_TOKEN'];

if (!token) throw Error('Missing API_TOKEN');

const tickerApi = new TickerApi(token);

type AppContentProps = {
  load: (ticker: string) => void;
  loading: boolean;
  data: any;
};

const AppContent: React.FC<AppContentProps> = ({ data, load, loading }) => {
  return (
    <div>
      <h1>Stock Data</h1>
      <TickerInput onSubmit={load} />
      {loading && <div>Loading...</div>}
      <h1>{data && JSON.stringify(data, null, '\n')}</h1>
    </div>
  );
};

const AppFunctionalComponent: React.FC = () => {
  const { data, load, loading } = tickerApi.useGetTicker();
  return <AppContent {...{ data, loading, load }} />;
};

class AppClassBased extends React.Component<
  any,
  { data: any; loading: boolean }
> {
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
        this.setState({
          data: tickerInformation,
          loading: false,
        });
      } catch (e) {
        console.log('There was an issue: ', e);
      }

      this.setState((prev) => ({ ...prev, loading: false }));
    })();
  }

  render() {
    return (
      <AppContent
        data={this.state.data}
        load={this.submit}
        loading={this.state.loading}
      />
    );
  }
}

export default AppClassBased;
