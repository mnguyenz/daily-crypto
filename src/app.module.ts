import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from '~config/database.config';
import { scheduleConfig } from '~config/schedule.config';
import { commandConfig } from '~config/command.config';
import { AverageCalculationModule } from '~average-calculation/average-calculation.module';
import { OrderModule } from '~order/order.module';
import { MarketModule } from '~market/market.module';

@Module({
    imports: [commandConfig, databaseConfig, scheduleConfig, AverageCalculationModule, MarketModule, OrderModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
