export interface IQueryHistoricalApiData {
  count: number
  created: string
  diagnostics: any
  lang: string
  results: {
   quote: Array<IQuote>
  }
}

export interface IQuote {
  Adj_Close: string
  Close: any
  Date: any
  High: string
  Low: string
  Open: string
  Symbol: string
  Volume: string
}
