import { Injectable } from '@nestjs/common';
import { ExchangeEnum } from '~core/enums/exchanges.enum';
import { BitgetMarketService } from './bitget-market.service';
import { IExchangeMarket } from '~market/interfaces/exchange-market.interface';

@Injectable()
export class ExchangeMarketService {
    constructor(private bitgetMarketService: BitgetMarketService) {}

    getExchange(exchange: ExchangeEnum): IExchangeMarket {
        switch (exchange) {
            case ExchangeEnum.BITGET:
                return this.bitgetMarketService;
            default:
                throw new Error(`Unsupported ExchangeMarketService exchange: ${exchange}`);
        }
    }
}
