import { OverviewResponse } from '~asset/types/overview-response.type';
import { AccountEnum } from '~core/enums/exchanges.enum';

export interface IExchangeAsset {
    overview(account: AccountEnum): Promise<OverviewResponse>;
}
