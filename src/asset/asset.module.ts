import { Module } from '@nestjs/common';
import { AssetService } from './services/asset.service';
import { AssetController } from './controllers/asset.controller';
import { ExchangeAssetService } from './services/exchange-asset.service';
import { BitgetAssetService } from './services/bitget-asset.service';
import { BinanceAssetService } from './services/binance-asset.service';
import { OkxAssetService } from './services/okx-asset.service';

@Module({
    imports: [],
    controllers: [AssetController],
    providers: [AssetService, ExchangeAssetService, BinanceAssetService, BitgetAssetService, OkxAssetService],
    exports: []
})
export class AssetModule {}
