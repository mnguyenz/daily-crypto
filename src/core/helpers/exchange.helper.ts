import { RestClientV2 } from 'bitget-api';
import { Spot } from 'mexc-api-sdk';
import { EXCHANGE_CLIENT_MAP } from '~core/constants/exchange.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';

export function getClient(exchange: ExchangeEnum, account: AccountEnum): RestClientV2 | Spot {
    return EXCHANGE_CLIENT_MAP[exchange]?.[account] ?? null;
}