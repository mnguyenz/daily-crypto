import { Injectable } from '@nestjs/common';
import { RestClientV2 } from 'bitget-api';
import { IExchangeAsset } from '~asset/interfaces/exchange-asset.interface';
import { OverviewResponse } from '~asset/types/overview-response.type';
import { ASSETS, STABLE_COINS } from '~core/constants/crypto-code.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { getClient } from '~core/helpers/exchange.helper';

@Injectable()
export class BitgetAssetService implements IExchangeAsset {
    constructor() {}

    async overview(account: AccountEnum): Promise<OverviewResponse> {
        try {
            const client = getClient(ExchangeEnum.BITGET, account) as RestClientV2;
            const balances = await client.getBalances();
            const spotAssets = await client.getSpotAccountAssets();
            const earnAssets = await client.getEarnAccount();

            let usdtBalance = 0;
            for (const balance of balances.data) {
                usdtBalance += parseFloat(balance.usdtBalance);
            }
            let stable = 0;
            let btcAmount = 0;
            let ethAmount = 0;
            let bnbAmount = 0;
            for (const asset of spotAssets.data) {
                if (STABLE_COINS.includes(asset.coin)) {
                    stable += parseFloat(asset.available);
                } else if (asset.coin === ASSETS.CRYPTO.BTC) {
                    btcAmount += parseFloat(asset.available);
                } else if (asset.coin === ASSETS.CRYPTO.ETH) {
                    ethAmount += parseFloat(asset.available);
                } else if (asset.coin === ASSETS.CRYPTO.BNB) {
                    bnbAmount += parseFloat(asset.available);
                }
            }
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
