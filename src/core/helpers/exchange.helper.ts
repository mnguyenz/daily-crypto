import { Spot as BinanceSpot } from '@binance/connector-typescript';
import { RestClientV2 } from 'bitget-api';
import { Spot as MexcSpot } from 'mexc-api-sdk';
import { EXCHANGE_CLIENT_MAP } from '~core/constants/exchange.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';

export function getClient(exchange: ExchangeEnum, account: AccountEnum): RestClientV2 | MexcSpot | BinanceSpot {
    return EXCHANGE_CLIENT_MAP[exchange]?.[account] ?? null;
}