import { Injectable } from '@nestjs/common';
import { BitgetOrderService } from './bitget-order.service';
import { IExchangeOrder } from '~order/interfaces/exchange-order.interface';
import { ExchangeEnum } from '~core/enums/exchanges.enum';
import { MexcOrderService } from './mexc-order.service';

@Injectable()
export class ExchangeOrderService {
    constructor(
        private bitgetOrderService: BitgetOrderService,
        private mexcOrderService: MexcOrderService
    ) {}

    getExchange(exchange: ExchangeEnum): IExchangeOrder {
        switch (exchange) {
            case ExchangeEnum.BITGET:
                return this.bitgetOrderService;
            case ExchangeEnum.MEXC:
                return this.mexcOrderService;
            default:
                throw new Error(`Unsupported ExchangeOrderService exchange: ${exchange}`);
        }
    }
}
