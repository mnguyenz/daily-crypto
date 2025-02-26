import { Injectable } from '@nestjs/common';
import { ExchangeEnum } from '~core/enums/exchanges.enum';
import { BitgetAssetService } from './bitget-asset.service';
import { IExchangeAsset } from '~asset/interfaces/exchange-asset.interface';

@Injectable()
export class ExchangeAssetService {
    constructor(
        private bitgetAssetService: BitgetAssetService,
    ) {}

    getExchange(exchange: ExchangeEnum): IExchangeAsset {
        switch (exchange) {
            case ExchangeEnum.BITGET:
                return this.bitgetAssetService;
            default:
                throw new Error(`Unsupported ExchangeAssetService exchange: ${exchange}`);
        }
    }
}
