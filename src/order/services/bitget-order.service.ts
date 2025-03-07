import { Injectable } from '@nestjs/common';
import { M_BITGET_CLIENT, REDEMPTION_AMOUNT_ACCURACY, X_BITGET_CLIENT } from '~core/constants/bitget.constant';
import { ASSETS, POSTFIX_NO_HYPHEN_USDT } from '~core/constants/crypto-code.constant';
import { AccountEnum } from '~core/enums/exchanges.enum';
import { roundUp } from '~core/helpers/number.helper';
import { delay } from '~core/helpers/time.helper';
import { IExchangeOrder } from '~order/interfaces/exchange-order.interface';

@Injectable()
export class BitgetOrderService implements IExchangeOrder {
    constructor() {}

    async buyMinimum(asset: string, price: number, account?: AccountEnum): Promise<void> {
        try {
            const symbol = `${asset}${POSTFIX_NO_HYPHEN_USDT}`;
            const client = account === AccountEnum.M ? M_BITGET_CLIENT : X_BITGET_CLIENT;
            let baseSizePrecision: number;
            let minBuy: number;
            try {
                const symbolInfo = await client.getSpotSymbolInfo({ symbol });
                baseSizePrecision = parseFloat(symbolInfo.data[0].quantityPrecision);
                minBuy = parseFloat(symbolInfo.data[0].minTradeUSDT);
            } catch (error) {
                console.error('Error BitgetOrderService buyMinimum exchangeInfo error:', error);
                process.exit(1);
            }
            const rawQuantity = minBuy / price;
            const quantity = roundUp(rawQuantity, baseSizePrecision);

            const usdtEarnProducts = await client.getEarnSavingsProducts({
                coin: ASSETS.FIAT.USDT,
                filter: 'available'
            });
            const flexibleUsdtProductId = usdtEarnProducts.data.filter(
                (product) => product.periodType === 'flexible'
            )[0].productId;

            try {
                await client.earnRedeemSavings({
                    productId: flexibleUsdtProductId,
                    periodType: 'flexible',
                    amount: String(roundUp(quantity * price, REDEMPTION_AMOUNT_ACCURACY))
                });
            } catch (error) {
                console.error('Error BitgetOrderService buyMinimum earnRedeemSavings error:', error);
                process.exit(1);
            }
            await this.waitForUsdtAvailability(ASSETS.FIAT.USDT, account);

            await client.spotSubmitOrder({
                symbol,
                side: 'buy',
                orderType: 'limit',
                force: 'gtc',
                size: String(quantity),
                price: String(price),
            });
        } catch (error) {
            console.error('Error BitgetOrderService buyMinimum error:', error);
            process.exit(1);
        }
    }

    private async waitForUsdtAvailability(coin: string, account?: AccountEnum) {
        const startTime = Date.now();
        const interval = 1000;
        const timeout = 30000;
        while (Date.now() - startTime < timeout) {
            try {
                const client = account === AccountEnum.M ? M_BITGET_CLIENT : X_BITGET_CLIENT;
                const usdtAssets = await client.getSpotAccountAssets({ coin });
                if (parseFloat(usdtAssets.data[0].available) > 1) {
                    return true;
                }
            } catch (error) {
                console.error('Error BitgetOrderService waitForUsdtAvailability error:', error);
                process.exit(1);
            }
            await delay(interval);
        }
        console.error('Timeout BitgetOrderService waitForUsdtAvailability');
        process.exit(1);
    }
}
