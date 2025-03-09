import { Injectable } from '@nestjs/common';
import { RestClientV2 } from 'bitget-api';
import { RestClient } from 'okx-api';
import { IExchangeAsset } from '~asset/interfaces/exchange-asset.interface';
import { AssetResponse } from '~asset/types/asset-response.type';
import { ASSETS, STABLE_COINS } from '~core/constants/crypto-code.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';
import { mergeAndSumAssets, transformAssetsToResponse } from '~core/helpers/asset.helper';
import { getClient } from '~core/helpers/exchange.helper';

@Injectable()
export class OkxAssetService implements IExchangeAsset {
    constructor() {}

    async overview(account: AccountEnum): Promise<AssetResponse> {
        try {
            const client = getClient(ExchangeEnum.OKX, account) as RestClient;
            const spot = await client.getBalance();
            const earn = await client.getSavingBalance();
            const spotResponse = transformAssetsToResponse(spot[0].details, 'ccy', 'availBal');
            const earnResponse = transformAssetsToResponse(earn, 'ccy', 'amt');
            return mergeAndSumAssets(spotResponse, earnResponse);
        } catch (error) {
            console.error('Error OkxAssetService overview:', error);
        }
    }
}
