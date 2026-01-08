import { IsString, IsNotEmpty, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { RiesgoEnum } from '../../../common/enums/riesgo.enum';

export class CreateHeatmapDto {
    @IsString()
    @IsNotEmpty()
    departamento: string;

    @IsNumber()
    latitud: number;

    @IsNumber()
    longitud: number;

    @IsEnum(RiesgoEnum)
    riesgo: RiesgoEnum;

    @IsDateString()
    fecha: string;
}
