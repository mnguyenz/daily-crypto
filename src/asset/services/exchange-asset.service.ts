import { Injectable } from '@nestjs/common';
import { ExchangeEnum } from '~core/enums/exchanges.enum';
import { BitgetAssetService } from './bitget-asset.service';
import { IExchangeAsset } from '~asset/interfaces/exchange-asset.interface';
import { BinanceAssetService } from './binance-asset.service';
import { OkxAssetService } from './okx-asset.service';
import { BybitAssetService } from './bybit-asset.service';

@Injectable()
export class ExchangeAssetService {
    constructor(
        private binanceAssetService: BinanceAssetService,
        private bitgetAssetService: BitgetAssetService,
        private bybitAssetService: BybitAssetService,
        private okxAssetService: OkxAssetService
    ) {}

    getExchange(exchange: ExchangeEnum): IExchangeAsset {
        switch (exchange) {
            case ExchangeEnum.BINANCE:
                return this.binanceAssetService;
            case ExchangeEnum.BITGET:
                return this.bitgetAssetService;
            case ExchangeEnum.BYBIT:
                return this.bybitAssetService;
            case ExchangeEnum.OKX:
                return this.okxAssetService;
            default:
                throw new Error(`Unsupported ExchangeAssetService exchange: ${exchange}`);
        }
    }
}
