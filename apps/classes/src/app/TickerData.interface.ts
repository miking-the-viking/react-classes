export interface Ticker {
  ticker: string;
  name: string;
  exchange_short: string;
  exchange_long: string;
  mic_code: string;
  currency: string;
  price: number;
  day_high: number;
  day_low: number;
  day_open: number;
  '52_week_high': number;
  '52_week_low': number;
  market_cap: number;
  previous_close_price: number;
  previous_close_price_time: Date;
  day_change: number;
  volume: number;
  is_extended_hours_price: boolean;
  last_trade_time: Date;
}
