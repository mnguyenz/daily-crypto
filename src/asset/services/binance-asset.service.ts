import { Spot } from '@binance/connector-typescript';
import { Injectable } from '@nestjs/common';
import { IExchangeAsset } from '~asset/interfaces/exchange-asset.interface';
import { SavingsResponse } from '~asset/types/savings-response.type';
import { ASSETS, STABLE_COINS } from '~core/constants/crypto-code.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { getClient } from '~core/helpers/exchange.helper';

@Injectable()
export class BinanceAssetService implements IExchangeAsset {
    constructor() {}

    async savings(account: AccountEnum): Promise<SavingsResponse> {
        try {
            const client = getClient(ExchangeEnum.BINANCE, account) as Spot;
            const earnBalance = await client.simpleAccount();
            const usdtBalance = parseFloat(earnBalance.totalAmountInUSDT);
            const flexibleEarns = await client.getFlexibleProductPosition({size: 100});
            const lockedEarns = await client.getLockedProductPosition({size: 100});
            let stable = 0;
            let btcAmount = 0;
            let ethAmount = 0;
            let bnbAmount = 0;
            for (const earn of flexibleEarns.rows) {
                if (STABLE_COINS.includes(earn.asset)) {
                    stable += parseFloat(earn.totalAmount);
                } else if (earn.asset === ASSETS.CRYPTO.BTC) {
                    btcAmount += parseFloat(earn.totalAmount);
                } else if (earn.asset === ASSETS.CRYPTO.ETH) {
                    ethAmount += parseFloat(earn.totalAmount);
                } else if (earn.asset === ASSETS.CRYPTO.BNB) {
                    bnbAmount += parseFloat(earn.totalAmount);
                }
            }
            for (const earn of lockedEarns.rows) {
                if (STABLE_COINS.includes(earn.asset)) {
                    stable += parseFloat(earn.amount);
                } else if (earn.asset === ASSETS.CRYPTO.BTC) {
                    btcAmount += parseFloat(earn.amount);
                } else if (earn.asset === ASSETS.CRYPTO.ETH) {
                    ethAmount += parseFloat(earn.amount);
                } else if (earn.asset === ASSETS.CRYPTO.BNB) {
                    bnbAmount += parseFloat(earn.amount);
                }
            }

            return {
                usdtBalance,
                stable,
                btcAmount,
                ethAmount,
                bnbAmount
            }
        } catch (error) {
            console.error('Error BinanceAssetService overview:', error);
        }
    }
}
