import { Module } from '@nestjs/common';
import { AssetService } from './services/asset.service';
import { AssetController } from './controllers/asset.controller';
import { ExchangeAssetService } from './services/exchange-asset.service';
import { BitgetAssetService } from './services/bitget-asset.service';
import { BinanceAssetService } from './services/binance-asset.service';
import { OkxAssetService } from './services/okx-asset.service';
import { BybitAssetService } from './services/bybit-asset.service';
import { EarnService } from './services/earn.service';

@Module({
    imports: [],
    controllers: [AssetController],
    providers: [
        AssetService,
        EarnService,
        ExchangeAssetService,
        BinanceAssetService,
        BitgetAssetService,
        BybitAssetService,
        OkxAssetService
    ],
    exports: []
})
export class AssetModule {}
