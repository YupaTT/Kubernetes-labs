import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHeatmapTable1704723600000 implements MigrationInterface {
    name = 'CreateHeatmapTable1704723600000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'heatmap',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'departamento',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'latitud',
                        type: 'decimal',
                        precision: 10,
                        scale: 7,
                        isNullable: false,
                    },
                    {
                        name: 'longitud',
                        type: 'decimal',
                        precision: 10,
                        scale: 7,
                        isNullable: false,
                    },
                    {
                        name: 'riesgo',
                        type: 'enum',
                        enum: ['Bajo', 'Medio', 'Alto'],
                        isNullable: false,
                    },
                    {
                        name: 'fecha',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                ],
                indices: [
                    {
                        name: 'IDX_HEATMAP_DEPARTAMENTO',
                        columnNames: ['departamento'],
                    },
                    {
                        name: 'IDX_HEATMAP_RIESGO',
                        columnNames: ['riesgo'],
                    },
                    {
                        name: 'IDX_HEATMAP_FECHA',
                        columnNames: ['fecha'],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('heatmap');
    }
}
