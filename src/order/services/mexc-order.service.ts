import { Injectable } from '@nestjs/common';
import { OrderSideEnum, OrderTypeEnum } from 'bingx-trading-api';
import { POSTFIX_NO_HYPHEN_USDT } from '~core/constants/crypto-code.constant';
import { M_MEXC_CLIENT, X_MEXC_CLIENT } from '~core/constants/mexc.constant';
import { AccountEnum } from '~core/enums/exchanges.enum';
import { IExchangeOrder } from '~order/interfaces/exchange-order.interface';

@Injectable()
export class MexcOrderService implements IExchangeOrder {
    constructor() {}

    async buyMinimum(asset: string, price: number, account?: AccountEnum): Promise<void> {
        try {
            const symbol = `${asset}${POSTFIX_NO_HYPHEN_USDT}`;
            const client = account === AccountEnum.M ? M_MEXC_CLIENT : X_MEXC_CLIENT;
            let baseSizePrecision: number;
            let minBuy: number;
            try {
                const exchangeInformations = await client.exchangeInfo({ symbol });
                baseSizePrecision = parseFloat(exchangeInformations.symbols[0].baseSizePrecision);
                minBuy = parseFloat(exchangeInformations.symbols[0].quoteAmountPrecision);
            } catch (error) {
                console.error('Error MexcOrderService buyMinimum exchangeInfo error:', error);
                process.exit(1);
            }
            const rawQuantity = minBuy / price;
            const quantity = Math.ceil(rawQuantity / baseSizePrecision) * baseSizePrecision;
            await client.newOrder(symbol, OrderSideEnum.BUY, OrderTypeEnum.LIMIT, {
                price,
                quantity
            });
        } catch (error) {
            console.error('Error MexcOrderService buyMinimum:', error);
            process.exit(1);
        }
    }
}
