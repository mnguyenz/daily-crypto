import { SavingsResponse } from '~asset/types/savings-response.type';
import { AccountEnum } from '~core/enums/exchanges.enum';

export interface IExchangeAsset {
    savings(account: AccountEnum): Promise<SavingsResponse>;
}
