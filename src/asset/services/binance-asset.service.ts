import { Spot } from '@binance/connector-typescript';
import { Injectable } from '@nestjs/common';
import { IExchangeAsset } from '~asset/interfaces/exchange-asset.interface';
import { AssetResponse } from '~asset/types/asset-response.type';
import { ASSETS, STABLE_COINS } from '~core/constants/crypto-code.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { mergeAndSumAssets, transformAssetsToResponse } from '~core/helpers/asset.helper';
import { getClient } from '~core/helpers/exchange.helper';

@Injectable()
export class BinanceAssetService implements IExchangeAsset {
    constructor() {}

    async overview(account: AccountEnum): Promise<AssetResponse> {
        try {
            const client = getClient(ExchangeEnum.BINANCE, account) as Spot;
            const spotAssets = await client.userAsset();
            const flexibleEarns = await client.getFlexibleProductPosition({size: 100});
            const lockedEarns = await client.getLockedProductPosition({size: 100});
            const spotResponse = transformAssetsToResponse(spotAssets, 'asset', 'free');
            const flexibleEarnsResponse = transformAssetsToResponse(flexibleEarns.rows, 'asset', 'totalAmount');
            const lockedEarnsResponse = transformAssetsToResponse(lockedEarns.rows, 'asset', 'amount');
            return mergeAndSumAssets(spotResponse, flexibleEarnsResponse, lockedEarnsResponse);
        } catch (error) {
            console.error('Error BinanceAssetService overview:', error);
        }
    }
}
