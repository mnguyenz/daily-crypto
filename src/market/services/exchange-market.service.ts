import { Injectable } from '@nestjs/common';
import { ExchangeEnum } from '~core/enums/exchanges.enum';
import { BitgetMarketService } from './bitget-market.service';
import { IExchangeMarket } from '~market/interfaces/exchange-market.interface';
import { MexcMarketService } from './mexc-market.service';

@Injectable()
export class ExchangeMarketService {
    constructor(
        private bitgetMarketService: BitgetMarketService,
        private mexcMarketService: MexcMarketService
    ) {}

    getExchange(exchange: ExchangeEnum): IExchangeMarket {
        switch (exchange) {
            case ExchangeEnum.BITGET:
                return this.bitgetMarketService;
            case ExchangeEnum.MEXC:
                return this.mexcMarketService;
            default:
                throw new Error(`Unsupported ExchangeMarketService exchange: ${exchange}`);
        }
    }
}
