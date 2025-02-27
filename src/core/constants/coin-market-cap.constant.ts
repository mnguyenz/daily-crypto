import restClient from 'coinmarketcap-js';
import { env } from '~config/env.config';

export const COIN_MARKET_CAP_CLIENT = restClient(env.COIN_MARKET_CAP_API_KEY);