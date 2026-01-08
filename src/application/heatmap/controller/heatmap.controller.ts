import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateHeatmapDto } from '../dto/create-heatmap.dto';
import { HeatmapQueryDto } from '../dto/heatmap-query.dto';
import { HeatmapService } from '../service';

@Controller('heatmaps')
export class HeatmapController {
    constructor(private readonly heatmapService: HeatmapService) { }

    @Get()
    async listar(@Query() paginacionQueryDto: HeatmapQueryDto) {
        return this.heatmapService.listar(paginacionQueryDto);
    }

    @Post()
    async crear(@Body() createHeatmapDto: CreateHeatmapDto) {
        return this.heatmapService.crear(createHeatmapDto);
    }
}
