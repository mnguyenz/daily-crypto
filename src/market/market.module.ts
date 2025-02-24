import { Module } from '@nestjs/common';
import { ExchangeMarketService } from './services/exchange-market.service';
import { BitgetMarketService } from './services/bitget-market.service';
import { MexcMarketService } from './services/mexc-market.service';

@Module({
    imports: [],
    controllers: [],
    providers: [ExchangeMarketService, BitgetMarketService, MexcMarketService],
    exports: [ExchangeMarketService]
})
export class MarketModule {}
