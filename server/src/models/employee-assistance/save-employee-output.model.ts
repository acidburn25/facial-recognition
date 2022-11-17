import { AsistenciaEmpleado as EmployeeAssistance } from 'src/entities/AsistenciaEmpleado.entity';
import { EmployeeAssistanceDto } from 'src/facial-recognition/dto/employeeAssistance.dto';
import { EmployeeAssistanceInterface } from '../interfaces/employee-assistance.interface';

export class SaveEmployeeOutputDB {
    constructor(employeeAssistanceDto: EmployeeAssistanceDto | EmployeeAssistanceInterface) {
        const assistance: EmployeeAssistance = new EmployeeAssistance();

        //if (employeeAssistanceDto.documento) {
            assistance.documento = employeeAssistanceDto.documento;
        //}

        //if (employeeAssistanceDto.fechaHoraEntrada) {
        //    assistance.fechaHoraEntrada = employeeAssistanceDto.fechaHoraEntrada;
        //}

        if (employeeAssistanceDto.fechaHoraSalida) {
            assistance.fechaHoraSalida = employeeAssistanceDto.fechaHoraSalida;
        }

        //if (assistance.createdAt) {
        //    assistance.createdAt = new Date();
        //}
        
        assistance.updatedAt = new Date();

        return assistance;
    }
}
