import { useCallback, useState } from 'react';

export class TickerApi {
  constructor(private readonly token: string) {}

  static TICKER_QUOTE_URL = (ticker: string, token: string) =>
    `https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${token}`;

  public async getTicker(ticker: string) {
    const response = await fetch(
      TickerApi.TICKER_QUOTE_URL(ticker, this.token)
    );
    const { data } = await response.json();

    if (!data || data.length === 0) {
      return null;
    }
    const tickerInformation = data[0];
    return tickerInformation;
  }

  useGetTicker() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const load = useCallback(
      async (ticker: string) => {
        let unmounted = false;
        if (!ticker) return;
        setLoading(true);
        try {
          const data = await this.getTicker(ticker);
          if (!unmounted) setLoading(false);

          if (!data) return;
          setData(data);
        } catch (e) {
          console.log('Error getting data', e);
        }
      },
      [setLoading, setData]
    );

    return {
      loading,
      data,
      load,
    };
  }
}
