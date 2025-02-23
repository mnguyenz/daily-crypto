import { Module } from '@nestjs/common';
import { ExchangeMarketService } from './services/exchange-market.service';
import { BitgetMarketService } from './services/bitget-market.service';

@Module({
    imports: [],
    controllers: [],
    providers: [ExchangeMarketService, BitgetMarketService],
    exports: [ExchangeMarketService]
})
export class MarketModule {}
