import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min, IsNotEmpty } from 'class-validator';

const LIMITE_MIN = 10;
const LIMITE_MAX = 50;
const PAGINA_MIN = 1;

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class PaginacionQueryDto {
    @Type(() => Number)
    @IsInt({ message: 'El límite debe ser un número entero' })
    @Min(LIMITE_MIN, {
        message: `El valor mínimo para límite debe ser ${LIMITE_MIN}.`,
    })
    @Max(LIMITE_MAX, {
        message: `El valor máximo para límite debe ser ${LIMITE_MAX}.`,
    })
    @IsOptional()
    readonly limite: number = LIMITE_MIN;

    @Type(() => Number)
    @IsInt({ message: 'La página debe ser un número entero' })
    @Min(PAGINA_MIN, {
        message: `El valor mínimo para página debe ser ${PAGINA_MIN}.`,
    })
    @IsOptional()
    readonly pagina: number = PAGINA_MIN;

    @IsNotEmpty({ message: 'El filtro no puede estar vacío' })
    @IsOptional()
    @IsString({ message: 'El filtro debe ser una cadena de texto' })
    readonly filtro?: string;

    @IsOptional()
    @IsString({ message: 'El orden debe ser una cadena de texto' })
    readonly orden?: string;

    get descendente() {
        return this.orden?.startsWith('-');
    }

    get campoOrden() {
        return !this.orden
            ? undefined
            : this.descendente
                ? this.orden.substring(1)
                : this.orden;
    }

    get sentido() {
        return this.descendente ? Order.DESC : Order.ASC;
    }

    get saltar(): number {
        return (this.pagina - 1) * this.limite;
    }
}
