
import { Spot } from 'mexc-api-sdk';
import { env } from '~config/env.config';

export const M_MEXC_CLIENT = new Spot(env.MEXC.M_API_KEY, env.MEXC.M_API_SECRET);
export const X_MEXC_CLIENT = new Spot(env.MEXC.M_API_KEY, env.MEXC.M_API_SECRET);
