import { Module } from '@nestjs/common';
import { DailyBuyCommand } from './commands/daily-buy.command';
import { AverageCalculationModule } from '~average-calculation/average-calculation.module';
import { ExchangeOrderService } from './services/exchange-order.service';
import { MarketModule } from '~market/market.module';
import { BitgetOrderService } from './services/bitget-order.service';

@Module({
    imports: [AverageCalculationModule, MarketModule],
    providers: [DailyBuyCommand, ExchangeOrderService, BitgetOrderService],
    exports: []
})
export class OrderModule {}
