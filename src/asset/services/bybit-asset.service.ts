import { Injectable } from '@nestjs/common';
import { IExchangeAsset } from '~asset/interfaces/exchange-asset.interface';
import { AssetResponse } from '~asset/types/asset-response.type';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { getClient } from '~core/helpers/exchange.helper';
import { mergeAndSumAssets, transformAssetsToResponse } from '~core/helpers/asset.helper';
import { RestClientV5 } from 'bybit-api';

@Injectable()
export class BybitAssetService implements IExchangeAsset {
    constructor() {}

    async overview(account: AccountEnum): Promise<AssetResponse> {
        try {
            console.log('MinhDebug BybitAssetService overview');
            const client = getClient(ExchangeEnum.BYBIT, account) as RestClientV5;
            const spotAssets = await client.getWalletBalance({ accountType: 'UNIFIED' });
            const spotAssets2 = await client.getWalletBalance({ accountType: 'CONTRACT' });
            const spotAssets3 = await client.getWalletBalance({ accountType: 'SPOT' });
            console.log('spotAssets', spotAssets.result.list);
            console.log('spotAssets COIN', spotAssets.result.list[0].coin);
            console.log('spotAssets2', spotAssets2);
            console.log('spotAssets3', spotAssets3);
            return {};
        } catch (error) {
            console.error('Error BybitAssetService overview:', error);
        }
    }
}
