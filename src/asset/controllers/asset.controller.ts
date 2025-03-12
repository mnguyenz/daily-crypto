import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetService } from '~asset/services/asset.service';
import { AssetResponse } from '~asset/types/asset-response.type';

@Controller('assets')
@ApiTags('Assets')
export class AssetController {
    constructor(private assetService: AssetService) {}

    @Get('overview')
    overview(): Promise<AssetResponse> {
        return this.assetService.overview();
    }

    // @Get('saving')
    // saving(): Promise<any> {
    //     return this.earnService.earning();
    // }
}
