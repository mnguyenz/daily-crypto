import { Injectable } from '@nestjs/common';
import { POSTFIX_NO_HYPHEN_USDT } from '~core/constants/crypto-code.constant';
import { M_MEXC_CLIENT } from '~core/constants/mexc.constant';
import { IExchangeMarket } from '~market/interfaces/exchange-market.interface';

@Injectable()
export class MexcMarketService implements IExchangeMarket {
    constructor() {}

    async currentPrice(asset: string): Promise<number> {
        const symbol = `${asset}${POSTFIX_NO_HYPHEN_USDT}`;
        const orderBooks = await M_MEXC_CLIENT.depth(symbol, { limit: 25 });
        if (orderBooks.bids.length > 0) {
            return parseFloat(orderBooks.bids[24]);
        } else {
            throw new Error(`Error MexcMarketService currentPrice: ${asset}`);
        }
    }
}
