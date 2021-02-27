// for better IDE autocomplete
// shows the status of relationship between current and previous currencies
export const enum CurrencyHistoryType {
  Same = 'same',
  Higher = 'higher',
  Lower = 'lower'
}

export interface CurrencyData {
  readonly [currencyKey: string]: number
}
