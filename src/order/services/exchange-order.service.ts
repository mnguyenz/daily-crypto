import { Injectable } from '@nestjs/common';
import { BitgetOrderService } from './bitget-order.service';
import { IExchangeOrder } from '~order/interfaces/exchange-order.interface';
import { ExchangeEnum } from '~core/enums/exchanges.enum';

@Injectable()
export class ExchangeOrderService {
    constructor(private bitgetOrderService: BitgetOrderService) {}

    getExchange(exchange: ExchangeEnum): IExchangeOrder {
        switch (exchange) {
            case ExchangeEnum.BITGET:
                return this.bitgetOrderService;
            default:
                throw new Error(`Unsupported ExchangeOrderService exchange: ${exchange}`);
        }
    }
}
