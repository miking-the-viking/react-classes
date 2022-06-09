import React from 'react';

type TickerInputProps = {
  onSubmit: (ticker: string) => void;
};
class TickerInput extends React.Component<TickerInputProps> {
  constructor(props: TickerInputProps) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(keyboardEvent: React.KeyboardEvent<HTMLInputElement>) {
    if (keyboardEvent.code === 'Enter') {
      this.props.onSubmit(keyboardEvent.currentTarget.value);
    }
  }

  render() {
    return (
      <label>
        Ticker:
        <input type="text" onKeyUp={this.onKeyUp} />
      </label>
    );
  }
}

export default TickerInput;
