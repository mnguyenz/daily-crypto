import { Injectable } from '@nestjs/common';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { ExchangeAssetService } from './exchange-asset.service';
import { SavingsResponse } from '~asset/types/savings-response.type';
import { EXCHANGE_CLIENT_MAP } from '~core/constants/exchange.constant';

@Injectable()
export class AssetService {
    constructor(private exchangeAssetService: ExchangeAssetService) {}

    async savings(): Promise<SavingsResponse> {
        let response: SavingsResponse = {
            usdtBalance: 0,
            stable: 0,
            btcAmount: 0,
            ethAmount: 0,
            bnbAmount: 0
        };
        await Promise.all(
            Object.entries(EXCHANGE_CLIENT_MAP).flatMap(([exchange, accounts]) =>
                Object.keys(accounts).map(async (account) => {
                    const service = this.exchangeAssetService.getExchange(exchange as ExchangeEnum);
                    const overview = await service.savings(account as unknown as AccountEnum);
                    response.usdtBalance += overview.usdtBalance;
                    response.stable += overview.stable;
                    response.btcAmount += overview.btcAmount;
                    response.ethAmount += overview.ethAmount;
                    response.bnbAmount += overview.bnbAmount;
                })
            )
        );
        return response;
    }
}
