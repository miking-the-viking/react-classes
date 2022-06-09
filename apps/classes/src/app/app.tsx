import styled from 'styled-components';
import React from 'react';
import TickerInput from './components/TickerInput';

const API_TOKEN = '4KaoqFwNmqgFV5P4ui8XQZydpb1UivieepU82edE';
class App extends React.Component<any, { data: any }> {
  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = { data: null };
  }

  componentDidMount() {
    console.log('mounted App!');
  }

  submit(ticker: string) {
    console.log('submitted ticker: ', ticker);

    // make api call
    // stockdata.org
    // 4KaoqFwNmqgFV5P4ui8XQZydpb1UivieepU82edE
    // https://api.stockdata.org/v1/data/quote?symbols=AAPL%2CTSLA%2CMSFT&api_token=4KaoqFwNmqgFV5P4ui8XQZydpb1UivieepU82edE

    const url = `https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${API_TOKEN}`;
    const response = fetch(url).then((data) =>
      data.json().then(({ data }) => {
        console.log('response: ', data);
        const tickerInformation = data[0];
        this.setState({ data: tickerInformation });
      })
    );
  }

  render() {
    return (
      <div>
        <h1>Stock Data</h1>
        <TickerInput onSubmit={this.submit} />
        <h1>{JSON.stringify(this.state.data)}</h1>
      </div>
    );
  }
}

export default App;
