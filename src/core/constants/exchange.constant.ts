import { AccountEnum, ExchangeEnum } from "~core/enums/exchanges.enum";
import { C_BITGET_CLIENT, M_BITGET_CLIENT, X_BITGET_CLIENT } from "./bitget.constant";

export const EXCHANGE_CLIENT_MAP = {
    [ExchangeEnum.BITGET]: {
        [AccountEnum.M]: M_BITGET_CLIENT,
        [AccountEnum.X]: X_BITGET_CLIENT,
        [AccountEnum.C]: C_BITGET_CLIENT,
    }
};
