import { Injectable } from '@nestjs/common';
import { M_BITGET_CLIENT, X_BITGET_CLIENT } from '~core/constants/bitget.constant';
import { ASSETS, POSTFIX_NO_HYPHEN_USDT } from '~core/constants/crypto-code.constant';
import { AccountEnum } from '~core/enums/exchanges.enum';
import { delay } from '~core/helpers/time.helper';
import { IExchangeOrder } from '~order/interfaces/exchange-order.interface';

@Injectable()
export class BitgetOrderService implements IExchangeOrder {
    constructor() {}

    async buyMinimum(asset: string, account?: AccountEnum): Promise<void> {
        try {
            const symbol = `${asset}${POSTFIX_NO_HYPHEN_USDT}`;
            const client = account === AccountEnum.M ? M_BITGET_CLIENT : X_BITGET_CLIENT;
            const usdtEarnProducts = await client.getEarnSavingsProducts({
                coin: ASSETS.FIAT.USDT,
                filter: 'available'
            });
            const flexibleUsdtProductId = usdtEarnProducts.data.filter(
                (product) => product.periodType === 'flexible'
            )[0].productId;
            await client.earnRedeemSavings({
                productId: flexibleUsdtProductId,
                periodType: 'flexible',
                amount: '1.01'
            });

            await this.waitForUsdtAvailability(ASSETS.FIAT.USDT, account);

            await client.spotSubmitOrder({
                symbol,
                side: 'buy',
                orderType: 'market',
                force: 'gtc',
                size: '1.005'
            });
        } catch (error) {
            console.error('Error BitgetOrderService buyMinimum:', error);
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
                console.error('Error BitgetOrderService waitForUsdtAvailability:', error);
            }
            await delay(interval);
        }
        throw new Error('Timeout BitgetOrderService waitForUsdtAvailability.');
    }
}
