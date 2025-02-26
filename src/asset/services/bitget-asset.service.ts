import { Injectable } from '@nestjs/common';
import { RestClientV2 } from 'bitget-api';
import { IExchangeAsset } from '~asset/interfaces/exchange-asset.interface';
import { SavingsResponse } from '~asset/types/savings-response.type';
import { ASSETS, STABLE_COINS } from '~core/constants/crypto-code.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { getClient } from '~core/helpers/exchange.helper';

@Injectable()
export class BitgetAssetService implements IExchangeAsset {
    constructor() {}

    async savings(account: AccountEnum): Promise<SavingsResponse> {
        try {
            const client = getClient(ExchangeEnum.BITGET, account) as RestClientV2;
            const balances = await client.getBalances();
            const earnAssets = await client.getEarnAccount();
            const usdtBalance = parseFloat(balances.data.find(account => account.accountType === 'earn')?.usdtBalance || '0');
            let stable = 0;
            let btcAmount = 0;
            let ethAmount = 0;
            let bnbAmount = 0;
            for (const asset of earnAssets.data) {
                if (STABLE_COINS.includes(asset.coin)) {
                    stable += parseFloat(asset.amount);
                } else if (asset.coin === ASSETS.CRYPTO.BTC) {
                    btcAmount += parseFloat(asset.amount);
                } else if (asset.coin === ASSETS.CRYPTO.ETH) {
                    ethAmount += parseFloat(asset.amount);
                } else if (asset.coin === ASSETS.CRYPTO.BNB) {
                    bnbAmount += parseFloat(asset.amount);
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
            console.error('Error BitgetAssetService overview:', error);
        }
    }
}
