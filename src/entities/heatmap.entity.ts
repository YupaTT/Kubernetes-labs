import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { RiesgoEnum } from '../common/enums/riesgo.enum';

@Entity('heatmap')
export class Heatmap {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    departamento: string;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    latitud: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    longitud: number;

    @Column({
        type: 'enum',
        enum: RiesgoEnum,
        default: RiesgoEnum.BAJO
    })
    riesgo: RiesgoEnum;

    @Column({ type: 'date' })
    fecha: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}