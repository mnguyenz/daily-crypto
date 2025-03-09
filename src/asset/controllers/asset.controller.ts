import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetService } from '~asset/services/asset.service';
import { AssetResponse } from '~asset/types/asset-response.type';

@Controller('asset')
@ApiTags('Asset')
export class AssetController {
    constructor(private assetService: AssetService) {}

    @Get('overview')
    overview(): Promise<AssetResponse> {
        return this.assetService.overview();
    }
}
