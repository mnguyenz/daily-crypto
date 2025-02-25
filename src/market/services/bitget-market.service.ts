import { Injectable } from '@nestjs/common';
import { BITGET_PUBLIC_CLIENT } from '~core/constants/bitget.constant';
import { POSTFIX_NO_HYPHEN_USDT } from '~core/constants/crypto-code.constant';
import { IExchangeMarket } from '~market/interfaces/exchange-market.interface';

@Injectable()
export class BitgetMarketService implements IExchangeMarket {
    constructor() {}

    async currentPrice(asset: string): Promise<number> {
        const symbol = `${asset}${POSTFIX_NO_HYPHEN_USDT}`;
        const orderBook = await BITGET_PUBLIC_CLIENT.getSpotOrderBookDepth({ symbol, limit: '10' });
        if (orderBook.data.bids.length > 0) {
            return parseFloat(orderBook.data.bids[9][0]);
        } else {
            throw new Error(`Error BitgetMarketService currentPrice: ${asset}`);
        }
    }
}
