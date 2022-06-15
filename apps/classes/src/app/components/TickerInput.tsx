import React from 'react';
import Form from 'react-bootstrap/Form';

type TickerInputProps = {
  onSubmit: (ticker: string) => void;
};
class TickerInput extends React.Component<TickerInputProps> {
  constructor(props: TickerInputProps) {
    super(props);
  }

  render() {
    return (
      <Form
        onSubmit={(
          e: React.FormEvent<HTMLFormElement> & {
            target: {
              ticker: HTMLInputElement;
            };
          }
        ) => {
          e.preventDefault();
          this.props.onSubmit(e.target.ticker.value);
        }}
      >
        <Form.Group>
          <Form.Label>Ticker: </Form.Label>
          <Form.Control type="text" id="ticker" />
        </Form.Group>
      </Form>
    );
  }
}

export default TickerInput;
