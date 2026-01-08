import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heatmap } from '../../entities/heatmap.entity';
import { HeatmapRepository } from './repository/heatmap.repository';
import { HeatmapController } from './controller';
import { HeatmapService } from './service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Heatmap])
    ],
    controllers: [HeatmapController],
    providers: [HeatmapService, HeatmapRepository],
    exports: [HeatmapService],
})
export class HeatmapModule { }
