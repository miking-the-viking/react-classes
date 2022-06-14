import { TickerApi } from '@react-classes/api';
import React, { useMemo } from 'react';
import TickerInput from './TickerInput';
import { Column, useTable } from 'react-table';
import { Ticker } from '../TickerData.interface';

console.log(process.env);
const token = process.env['NX_API_TOKEN'];

if (!token) throw Error('Missing API_TOKEN');

const tickerApi = new TickerApi(token);

type StockQuoteContentProps = {
  load: (ticker: string) => void;
  loading: boolean;
  data: Ticker;
};

const COLUMNS_LABELS: Partial<Record<keyof Ticker, string>> = {
  currency: 'Currency',
  day_high: 'Day High',
  day_low: 'Day Low',
  name: 'Name',
  price: 'Price',
  volume: 'Volume',
  previous_close_price: 'Previous close price',
};

const StockQuoteContent: React.FC<StockQuoteContentProps> = ({
  data,
  load,
  loading,
}) => {
  const columns = useMemo(() => {
    return Object.entries(COLUMNS_LABELS).map(([accessor, Header]) => ({
      accessor,
      Header,
    })) as Column<Ticker>[];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Ticker>({ columns, data: data ? [data] : [] });

  return (
    <div>
      <h1>Stock Data</h1>
      <TickerInput onSubmit={load} />
      {loading && <div>Loading...</div>}
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows

            headerGroups.map((headerGroup) => (
              // Apply the header row props

              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row

                  headerGroup.headers.map((column) => (
                    // Apply the header cell props

                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header

                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>

        {/* Apply the table body props */}

        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows

            rows.map((row) => {
              // Prepare the row for display

              prepareRow(row);

              return (
                // Apply the row props

                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells

                    row.cells.map((cell) => {
                      // Apply the cell props

                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents

                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
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
