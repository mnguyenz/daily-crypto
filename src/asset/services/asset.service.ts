import { Injectable } from '@nestjs/common';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { ExchangeAssetService } from './exchange-asset.service';
import { AssetResponse } from '~asset/types/asset-response.type';
import { EXCHANGE_CLIENT_MAP } from '~core/constants/exchange.constant';
import { COIN_MARKET_CAP_CLIENT } from '~core/constants/coin-market-cap.constant';

@Injectable()
export class AssetService {
    constructor(private exchangeAssetService: ExchangeAssetService) {}

    async overview(): Promise<AssetResponse> {
        let assets: Record<string, number> = {};

        await Promise.all(
            Object.entries(EXCHANGE_CLIENT_MAP).flatMap(([exchange, accounts]) =>
                Object.keys(accounts).map(async (account) => {
                    const service = this.exchangeAssetService.getExchange(exchange as ExchangeEnum);
                    const overview = await service.overview(account as unknown as AccountEnum);
                    for (const [asset, amount] of Object.entries(overview)) {
                        assets[asset] = (assets[asset] || 0) + (typeof amount === 'number' ? amount : parseFloat(String(amount)));
                    }
                })
            )
        );

        const overview = await this.calculatePortfolioValue(assets);
        return overview;
    }

    private async calculatePortfolioValue(assets: Record<string, number>): Promise<any> {
        const assetSymbols = Object.keys(assets).map(coin => {
            const match = coin.match(/^(\d+)([A-Z]+)$/);
            return match ? match[2] : coin;
        });

        const prices = await COIN_MARKET_CAP_CLIENT.crypto.latestQuotes({ symbol: assetSymbols.join(',') });

        let totalValue = 0;
        const valuation: Record<string, { amount: number; value: number; percentage: number }> = {};

        for (const [coin, amount] of Object.entries(assets)) {
            const match = coin.match(/^(\d+)([A-Z]+)$/);
            let actualCoin = coin;
            let multiplier = 1;

            if (match) {
                multiplier = parseInt(match[1], 10);
                actualCoin = match[2];
            }

            const price = prices.data[actualCoin]?.quote?.USD?.price || 0;
            const value = amount * price * multiplier;
            totalValue += value;
            valuation[coin] = { amount, value, percentage: 0 };
        }

        for (const coin in valuation) {
            valuation[coin].percentage = totalValue > 0 ? (valuation[coin].value / totalValue) * 100 : 0;
        }

        return { totalValue, valuation };
    }
}
