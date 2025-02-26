import { Module } from '@nestjs/common';
import { AssetService } from './services/asset.service';
import { AssetController } from './controllers/asset.controller';
import { ExchangeAssetService } from './services/exchange-asset.service';
import { BitgetAssetService } from './services/bitget-asset.service';

@Module({
    imports: [],
    controllers: [AssetController],
    providers: [AssetService, ExchangeAssetService, BitgetAssetService],
    exports: []
})
export class AssetModule {}
