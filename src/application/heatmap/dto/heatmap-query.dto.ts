import { IsDateString, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginacionQueryDto } from '../../../common/dto/paginacion-query.dto';
import { RiesgoEnum } from '../../../common/enums';

export class HeatmapQueryDto extends PaginacionQueryDto {
    @IsOptional()
    readonly departamento?: string;

    @IsOptional()
    @IsEnum(RiesgoEnum, {
        message: 'El riesgo debe ser uno de los valores válidos: Bajo, Medio, Alto'
    })
    readonly riesgo?: RiesgoEnum;

    @IsOptional()
    @Type(() => Date)
    @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
    readonly fechaInicio?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
    readonly fechaFin?: string;
}
