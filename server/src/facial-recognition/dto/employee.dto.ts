import { IsOptional } from 'class-validator';
import { EmployeeInterface } from '../../models/interfaces/index'

export class EmployeeDto implements EmployeeInterface {
    @IsOptional()
    id: number;

    @IsOptional()
    documento: string;

    @IsOptional()
    apellidoPaterno: string;

    @IsOptional()
    apellidoMaterno: string;

    @IsOptional()
    primerNombre: string;

    @IsOptional()
    segundoNombre: string | null;

    @IsOptional()
    sexo: string | null;

    @IsOptional()
    fechaNacimiento: string | null;
    
    @IsOptional()
    direccion: string | null;

    @IsOptional()
    telefonoCelular: number | null;

    @IsOptional()
    telefonoFijo: number | null;

    @IsOptional()
    createdAt: Date | null;

    @IsOptional()
    updatedAt: Date | null;
}
