import { Spot } from '@binance/connector-typescript';
import { env } from '~config/env.config';

export const M_BINANCE_CLIENT = new Spot(env.BINANCE.M_API_KEY, env.BINANCE.M_API_SECRET, {
    baseURL: env.BINANCE.API_URL
});

export const X_BINANCE_CLIENT = new Spot(env.BINANCE.X_API_KEY, env.BINANCE.X_API_SECRET, {
    baseURL: env.BINANCE.API_URL
});

export const C_BINANCE_CLIENT = new Spot(env.BINANCE.C_API_KEY, env.BINANCE.C_API_SECRET, {
    baseURL: env.BINANCE.API_URL
});

