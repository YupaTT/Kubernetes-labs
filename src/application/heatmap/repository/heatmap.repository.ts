import { Injectable } from '@nestjs/common';
import { DataSource, Repository, Between } from 'typeorm';
import { Heatmap } from '../../../entities/heatmap.entity';
import { CreateHeatmapDto } from '../dto/create-heatmap.dto';
import { HeatmapQueryDto } from '../dto/heatmap-query.dto';

@Injectable()
export class HeatmapRepository {
    private repository: Repository<Heatmap>;

    constructor(private dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(Heatmap);
    }

    async findWithPagination(query: HeatmapQueryDto) {
        const queryBuilder = this.repository.createQueryBuilder('heatmap');

        if (query.departamento) {
            queryBuilder.andWhere('LOWER(heatmap.departamento) LIKE LOWER(:departamento)', {
                departamento: `%${query.departamento}%`,
            });
        }

        if (query.riesgo) {
            queryBuilder.andWhere('heatmap.riesgo = :riesgo', {
                riesgo: query.riesgo,
            });
        }

        if (query.fechaInicio) {
            queryBuilder.andWhere('heatmap.fecha >= :fechaInicio', {
                fechaInicio: query.fechaInicio,
            });
        }

        if (query.fechaFin) {
            queryBuilder.andWhere('heatmap.fecha <= :fechaFin', {
                fechaFin: query.fechaFin,
            });
        }

        if (query.filtro) {
            queryBuilder.andWhere(
                '(LOWER(heatmap.departamento) LIKE LOWER(:filtro) OR LOWER(heatmap.riesgo) LIKE LOWER(:filtro))',
                { filtro: `%${query.filtro}%` }
            );
        }

        if (query.campoOrden) {
            const camposValidos = ['fecha', 'departamento', 'riesgo', 'latitud', 'longitud'];
            if (camposValidos.includes(query.campoOrden)) {
                queryBuilder.orderBy(`heatmap.${query.campoOrden}`, query.sentido);
            }
        } else {
            queryBuilder.orderBy('heatmap.fecha', 'DESC');
        }

        queryBuilder.skip(query.saltar).take(query.limite);

        const [items, total] = await queryBuilder.getManyAndCount();

        return {
            items,
            total,
            pagina: query.pagina,
            limite: query.limite,
            totalPaginas: Math.ceil(total / query.limite),
        };
    }

    async create(createHeatmapDto: CreateHeatmapDto): Promise<Heatmap> {
        const heatmap = this.repository.create({
            ...createHeatmapDto,
            fecha: new Date(createHeatmapDto.fecha)
        });
        return this.repository.save(heatmap);
    }

    async findById(id: number): Promise<Heatmap | null> {
        return this.repository.findOne({ where: { id } });
    }
}
