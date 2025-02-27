import { AccountEnum, ExchangeEnum } from "~core/enums/exchanges.enum";
import { C_BITGET_CLIENT, M_BITGET_CLIENT, X_BITGET_CLIENT } from "./bitget.constant";
import { C_BINANCE_CLIENT, M_BINANCE_CLIENT, X_BINANCE_CLIENT } from "./binance.constant";
import { C_OKX_CLIENT, M_OKX_CLIENT, X_OKX_CLIENT } from "./okx.constant";

export const EXCHANGE_CLIENT_MAP = {
    [ExchangeEnum.BINANCE]: {
        [AccountEnum.M]: M_BINANCE_CLIENT,
        [AccountEnum.X]: X_BINANCE_CLIENT,
        [AccountEnum.C]: C_BINANCE_CLIENT,
    },
    [ExchangeEnum.BITGET]: {
        [AccountEnum.M]: M_BITGET_CLIENT,
        [AccountEnum.X]: X_BITGET_CLIENT,
        [AccountEnum.C]: C_BITGET_CLIENT,
    },
    [ExchangeEnum.OKX]: {
        [AccountEnum.M]: M_OKX_CLIENT,
        [AccountEnum.X]: X_OKX_CLIENT,
        [AccountEnum.C]: C_OKX_CLIENT,
    }
};
