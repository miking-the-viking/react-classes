import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { Ticker } from '../TickerData.interface';

const COLUMNS_LABELS: Partial<Record<keyof Ticker, string>> = {
  currency: 'Currency',
  day_high: 'Day High',
  day_low: 'Day Low',
  name: 'Name',
  price: 'Price',
  volume: 'Volume',
  previous_close_price: 'Previous close price',
  day_open: 'Day Open',
  day_change: 'Day Change',
  ticker: 'Ticker',
  exchange_long: 'Exchange (long)',
  exchange_short: 'Exchange (short)',
  previous_close_price_time: 'Previous Close Time',
  is_extended_hours_price: '(ext hours price?)',
  '52_week_high': '52 High',
  '52_week_low': '52 Low',
  market_cap: 'Mkt Cap',
  last_trade_time: 'Last Trade Time',
  mic_code: 'MIC',
};

const TickerTable: React.FC<{ data: Ticker[] }> = ({ data }) => {
  const columns = useMemo(
    () =>
      Object.entries(COLUMNS_LABELS).map(([accessor, Header]) => ({
        accessor,
        Header,
      })) as Column<Ticker>[],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Ticker>({ columns, data });

  return (
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
  );
};

export default TickerTable;
