import { Injectable } from '@nestjs/common';
import { RestClientV2 } from 'bitget-api';
import { IExchangeAsset } from '~asset/interfaces/exchange-asset.interface';
import { AssetResponse } from '~asset/types/asset-response.type';
import { ASSETS, STABLE_COINS } from '~core/constants/crypto-code.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { getClient } from '~core/helpers/exchange.helper';
import { mergeAndSumAssets, transformAssetsToResponse } from '~core/helpers/asset.helper';

@Injectable()
export class BitgetAssetService implements IExchangeAsset {
    constructor() {}

    async overview(account: AccountEnum): Promise<AssetResponse> {
        try {
            const client = getClient(ExchangeEnum.BITGET, account) as RestClientV2;
            const spotAssets = await client.getSpotAccountAssets();
            const earnAssets = await client.getEarnAccount();
            const spotResponse = transformAssetsToResponse(spotAssets.data, 'coin', 'available');
            const earnResponse = transformAssetsToResponse(earnAssets.data, 'coin', 'amount');
            return mergeAndSumAssets(spotResponse, earnResponse);
        } catch (error) {
            console.error('Error BitgetAssetService overview:', error);
        }
    }
}
