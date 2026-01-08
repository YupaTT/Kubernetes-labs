import { Injectable, NotFoundException } from '@nestjs/common';
import { HeatmapRepository } from '../repository/heatmap.repository';
import { CreateHeatmapDto } from '../dto/create-heatmap.dto';
import { HeatmapQueryDto } from '../dto/heatmap-query.dto';

@Injectable()
export class HeatmapService {
    constructor(private readonly heatmapRepository: HeatmapRepository) { }

    async listar(query: HeatmapQueryDto) {
        return this.heatmapRepository.findWithPagination(query);
    }

    async crear(createHeatmapDto: CreateHeatmapDto) {
        return this.heatmapRepository.create(createHeatmapDto);
    }

    async encontrarPorId(id: number) {
        const heatmap = await this.heatmapRepository.findById(id);
        if (!heatmap) {
            throw new NotFoundException(`Heatmap con ID ${id} no encontrado`);
        }
        return heatmap;
    }
}
