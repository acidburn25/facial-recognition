import { EmployeeAssistanceInterface } from "../interfaces/employee-assistance.interface";
import { AsistenciaEmpleado as EmployeeAssistance } from 'src/entities/AsistenciaEmpleado.entity';

export class EmployeeAssistanceObject implements EmployeeAssistanceInterface {
    id: number;
    documento: string;
    fechaHoraEntrada: Date | string;
    fechaHoraSalida: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(employeeAssistanceObject: EmployeeAssistance) {
        this.id = employeeAssistanceObject.id;
        this.documento = employeeAssistanceObject.documento;
        this.fechaHoraEntrada = employeeAssistanceObject.fechaHoraEntrada;
        this.fechaHoraSalida = employeeAssistanceObject.fechaHoraSalida;
        this.createdAt = employeeAssistanceObject.createdAt;
        this.updatedAt = employeeAssistanceObject.updatedAt;
    }
}