import { AccountEnum } from '~core/enums/exchanges.enum';

export interface IExchangeOrder {
    buyMinimum(asset: string, account: AccountEnum): Promise<void>;
}
