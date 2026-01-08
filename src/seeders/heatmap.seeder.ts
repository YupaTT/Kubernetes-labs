import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Heatmap } from '../entities/heatmap.entity';
import { RiesgoEnum } from '../common/enums/riesgo.enum';

@Injectable()
export class HeatmapSeeder {
    constructor(private readonly dataSource: DataSource) { }

    async seed(): Promise<void> {
        const repository = this.dataSource.getRepository(Heatmap);

        // Verificar si ya existen datos
        const existingData = await repository.count();
        if (existingData > 0) {
            console.log('Los datos del seeder ya existen. Saltando...');
            return;
        }

        const policeData = [
            // La Paz - Capital administrativa
            {
                departamento: 'La Paz',
                latitud: -16.5000,
                longitud: -68.1193,
                riesgo: RiesgoEnum.ALTO,
                fecha: new Date('2025-12-01'),
            },
            {
                departamento: 'La Paz',
                latitud: -16.5040,
                longitud: -68.1300,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2025-12-02'),
            },
            {
                departamento: 'La Paz',
                latitud: -16.4955,
                longitud: -68.1335,
                riesgo: RiesgoEnum.BAJO,
                fecha: new Date('2025-12-03'),
            },

            // Santa Cruz - Departamento más poblado
            {
                departamento: 'Santa Cruz',
                latitud: -17.7833,
                longitud: -63.1821,
                riesgo: RiesgoEnum.ALTO,
                fecha: new Date('2025-12-01'),
            },
            {
                departamento: 'Santa Cruz',
                latitud: -17.7889,
                longitud: -63.1756,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2025-12-02'),
            },
            {
                departamento: 'Santa Cruz',
                latitud: -17.7778,
                longitud: -63.1889,
                riesgo: RiesgoEnum.BAJO,
                fecha: new Date('2025-12-03'),
            },

            // Cochabamba - Centro del país
            {
                departamento: 'Cochabamba',
                latitud: -17.3895,
                longitud: -66.1568,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2025-12-01'),
            },
            {
                departamento: 'Cochabamba',
                latitud: -17.3950,
                longitud: -66.1600,
                riesgo: RiesgoEnum.ALTO,
                fecha: new Date('2025-12-02'),
            },
            {
                departamento: 'Cochabamba',
                latitud: -17.3840,
                longitud: -66.1535,
                riesgo: RiesgoEnum.BAJO,
                fecha: new Date('2025-12-03'),
            },

            // Potosí - Zona minera
            {
                departamento: 'Potosí',
                latitud: -19.5723,
                longitud: -65.7550,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2025-12-01'),
            },
            {
                departamento: 'Potosí',
                latitud: -19.5780,
                longitud: -65.7600,
                riesgo: RiesgoEnum.ALTO,
                fecha: new Date('2025-12-02'),
            },

            // Sucre - Capital constitucional
            {
                departamento: 'Chuquisaca',
                latitud: -19.0196,
                longitud: -65.2619,
                riesgo: RiesgoEnum.BAJO,
                fecha: new Date('2025-12-01'),
            },
            {
                departamento: 'Chuquisaca',
                latitud: -19.0250,
                longitud: -65.2670,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2025-12-02'),
            },

            // Oruro - Zona altiplánica
            {
                departamento: 'Oruro',
                latitud: -17.9667,
                longitud: -67.1167,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2025-12-01'),
            },
            {
                departamento: 'Oruro',
                latitud: -17.9700,
                longitud: -67.1200,
                riesgo: RiesgoEnum.BAJO,
                fecha: new Date('2025-12-02'),
            },

            // Tarija - Sur del país
            {
                departamento: 'Tarija',
                latitud: -21.5355,
                longitud: -64.7296,
                riesgo: RiesgoEnum.BAJO,
                fecha: new Date('2025-12-01'),
            },
            {
                departamento: 'Tarija',
                latitud: -21.5400,
                longitud: -64.7350,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2025-12-02'),
            },

            // Beni - Región amazónica
            {
                departamento: 'Beni',
                latitud: -14.8333,
                longitud: -64.9000,
                riesgo: RiesgoEnum.ALTO,
                fecha: new Date('2025-12-01'),
            },
            {
                departamento: 'Beni',
                latitud: -14.8400,
                longitud: -64.9100,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2025-12-02'),
            },

            // Pando - Frontera norte
            {
                departamento: 'Pando',
                latitud: -11.0267,
                longitud: -68.7692,
                riesgo: RiesgoEnum.ALTO,
                fecha: new Date('2025-12-01'),
            },
            {
                departamento: 'Pando',
                latitud: -11.0300,
                longitud: -68.7750,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2025-12-02'),
            },

            // Datos más recientes de enero 2026
            {
                departamento: 'La Paz',
                latitud: -16.4985,
                longitud: -68.1250,
                riesgo: RiesgoEnum.ALTO,
                fecha: new Date('2026-01-05'),
            },
            {
                departamento: 'Santa Cruz',
                latitud: -17.7800,
                longitud: -63.1800,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2026-01-06'),
            },
            {
                departamento: 'Cochabamba',
                latitud: -17.3920,
                longitud: -66.1580,
                riesgo: RiesgoEnum.BAJO,
                fecha: new Date('2026-01-07'),
            },
            {
                departamento: 'Potosí',
                latitud: -19.5750,
                longitud: -65.7580,
                riesgo: RiesgoEnum.ALTO,
                fecha: new Date('2026-01-08'),
            },
            {
                departamento: 'Beni',
                latitud: -14.8360,
                longitud: -64.9050,
                riesgo: RiesgoEnum.MEDIO,
                fecha: new Date('2026-01-08'),
            },
        ];

        try {
            await repository.save(policeData);
            console.log(`✅ Seeder ejecutado correctamente. Se insertaron ${policeData.length} registros de datos policiales de Bolivia.`);
        } catch (error) {
            console.error('❌ Error al ejecutar el seeder:', error);
            throw error;
        }
    }
}
