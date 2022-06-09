import styled from 'styled-components';
import React from 'react';
import TickerInput from './components/TickerInput';

const API_TOKEN = '4KaoqFwNmqgFV5P4ui8XQZydpb1UivieepU82edE';
class App extends React.Component<any, { data: any; loading: boolean }> {
  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = { data: null, loading: false };
  }

  componentDidMount() {
    console.log('mounted App!');
  }

  submit(ticker: string) {
    console.log('submitted ticker: ', ticker);

    const url = `https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${API_TOKEN}`;
    (async () => {
      this.setState((prev) => ({ ...prev, loading: true }));

      try {
        const response = await fetch(url);
        const { data } = await response.json();
        const tickerInformation = data[0];
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
      <div>
        <h1>Stock Data</h1>
        <TickerInput onSubmit={this.submit} />
        {this.state.loading && <div>Loading...</div>}
        <h1>
          {this.state.data && JSON.stringify(this.state.data, null, '\n')}
        </h1>
      </div>
    );
  }
}

export default App;
