import { IsOptional } from 'class-validator';
import { EmployeeAssistanceInterface } from '../../models/interfaces/index'

export class EmployeeAssistanceDto implements EmployeeAssistanceInterface {
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
