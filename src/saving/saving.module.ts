import { Module } from '@nestjs/common';
import { BinanceSavingService } from './services/binance-saving.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        BinanceSavingService,
    ],
    exports: []
})
export class SavingModule {}
