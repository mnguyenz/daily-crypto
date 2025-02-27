import { AssetResponse } from "~asset/types/asset-response.type";

export const transformAssetsToResponse = <T>(
    assets: T[],
    coinKey: keyof T,
    amountKey: keyof T
): AssetResponse => {
    return assets.reduce<AssetResponse>((acc, asset) => {
        const coin = String(asset[coinKey]);
        const amount = parseFloat(String(asset[amountKey]));
        acc[coin] = (acc[coin] || 0) + amount;
        return acc;
    }, {});
};

export const mergeAndSumAssets = (...objects: AssetResponse[]): AssetResponse => {
    return objects.reduce<AssetResponse>((acc, obj) => {
        for (const key in obj) {
            acc[key] = (acc[key] || 0) + obj[key];
        }
        return acc;
    }, {});
};