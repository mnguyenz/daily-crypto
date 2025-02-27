import { Spot as BinanceSpot } from '@binance/connector-typescript';
import { RestClientV2 } from 'bitget-api';
import { RestClientV5 } from 'bybit-api';
import { Spot as MexcSpot } from 'mexc-api-sdk';
import { RestClient } from 'okx-api';
import { EXCHANGE_CLIENT_MAP } from '~core/constants/exchange.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';

export function getClient(exchange: ExchangeEnum, account: AccountEnum): RestClientV2 | MexcSpot | BinanceSpot | RestClient | RestClientV5 {
    return EXCHANGE_CLIENT_MAP[exchange]?.[account] ?? null;
}