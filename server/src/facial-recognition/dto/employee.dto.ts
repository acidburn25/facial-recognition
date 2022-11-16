import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EmployeeAssistanceInterface } from '../../models/interfaces/employee-assistance.interface'

export class EmployeeDto implements EmployeeAssistanceInterface {
    @IsNotEmpty()
    employee: string;

    @IsOptional()
    id: number;

    @IsOptional()
    documento: string;

    @IsOptional()
    fechaHoraEntrada: Date;

    @IsOptional()
    fechaHoraSalida: Date;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}
