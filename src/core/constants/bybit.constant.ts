import { RestClientV5 } from 'bybit-api';
import { env } from '~config/env.config';

export const M_BYBIT_CLIENT = new RestClientV5({
    key: env.BYBIT.M_API_KEY,
    secret: env.BYBIT.M_API_SECRET,
});