import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetService } from '~asset/services/asset.service';

@Controller('asset')
@ApiTags('Asset')
export class AssetController {
    constructor(private assetService: AssetService) {}

    @Get()
    overview(): Promise<any> {
        return this.assetService.overview();
    }
}
