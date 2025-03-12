import { Injectable } from '@nestjs/common';
import { IExchangeSaving } from '~saving/interfaces/exchange-saving.interface';

@Injectable()
export class BinanceSavingService implements IExchangeSaving {
    constructor() {}

    async getFlexibleProduction(): Promise<any> {
        return 0;
    }
}
