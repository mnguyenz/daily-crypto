import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetService } from '~asset/services/asset.service';
import { SavingsResponse } from '~asset/types/savings-response.type';

@Controller('asset')
@ApiTags('Asset')
export class AssetController {
    constructor(private assetService: AssetService) {}

    @Get('savings')
    savings(): Promise<SavingsResponse> {
        return this.assetService.savings();
    }
}
