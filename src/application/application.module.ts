import { Module } from '@nestjs/common'
import { HeatmapModule } from './heatmap/heatmap.module';
@Module({
    imports: [HeatmapModule],
})
export class ApplicationModule { }
