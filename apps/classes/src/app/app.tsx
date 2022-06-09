import styled from 'styled-components';
import React from 'react';
import TickerInput from './components/TickerInput';

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    console.log('mounted App!');
  }

  submit(ticker: string) {
    console.log('submitted ticker: ', ticker);
  }

  render() {
    return (
      <div>
        <h1>Stock Data</h1>
        <TickerInput onSubmit={this.submit} />
      </div>
    );
  }
}

export default App;
