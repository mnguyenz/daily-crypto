import { Injectable } from '@nestjs/common';
import { BaseCommand, Command } from '@hodfords/nestjs-command';
import { ExchangeOrderService } from '~order/services/exchange-order.service';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { AverageCalculationService } from '~average-calculation/services/average-calculation.service';
import { ExchangeMarketService } from '~market/services/exchange-market.service';
import { ASSETS } from '~core/constants/crypto-code.constant';

@Command({
    signature: 'daily-buy',
    description: 'This is command for daily buy crypto',
    options: [
        {
            value: '--asset <asset>',
            description: 'Crypto Asset'
        },
        {
            value: '--exchange <exchange>',
            description: 'Crypto Exchange'
        }
    ]
})
@Injectable()
export class DailyBuyCommand extends BaseCommand {
    constructor(
        private averageCalculationService: AverageCalculationService,
        private exchangeOrderService: ExchangeOrderService,
        private exchangeMarketService: ExchangeMarketService
    ) {
        super();
    }

    public async handle(): Promise<void> {
        const options = this.program.opts();
        const { asset = ASSETS.CRYPTO.ETH, exchange = ExchangeEnum.BITGET } = options;
        try {
            const orderService = this.exchangeOrderService.getExchange(exchange);
            const marketService = this.exchangeMarketService.getExchange(exchange);
            const currentPrice = await marketService.currentPrice(asset);
            if (await this.checkIsBuyOrNot(asset, currentPrice)) {
                await orderService.buyMinimum(asset, currentPrice, AccountEnum.X);
            }
        } catch (error) {
            this.error(`Error DailyBuyCommand. Error: ${error.message}`);
            throw error;
        }
    }

    private async checkIsBuyOrNot(asset: string, currentPrice: number): Promise<boolean> {
        const getAverage = await this.averageCalculationService.getAverageByAsset(asset);
        if (getAverage.dcaBuyAfterSell > currentPrice) {
            return true;
        } else {
            if (asset === ASSETS.CRYPTO.BTC && getAverage.maxBuy > currentPrice) {
                return true;
            }
            return false;
        }
    }
}
