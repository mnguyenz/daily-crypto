export interface IExchangeMarket {
    currentPrice(asset: string): Promise<number>;
}
