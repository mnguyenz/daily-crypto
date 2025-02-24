import { AccountEnum } from '~core/enums/exchanges.enum';

export interface IExchangeOrder {
    buyMinimum(asset: string, price?: number, account?: AccountEnum): Promise<void>;
}
