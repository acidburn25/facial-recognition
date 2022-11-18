import { AsistenciaEmpleado as EmployeeAssistance } from 'src/entities/AsistenciaEmpleado.entity';
import { EmployeeAssistanceDto } from 'src/facial-recognition/dto/employeeAssistance.dto';
import { EmployeeAssistanceInterface } from '../interfaces/employee-assistance.interface';

export class SaveEmployeeEntryDB {
    constructor(employeeAssistanceDto: EmployeeAssistanceDto | EmployeeAssistanceInterface) {
        const assistance: EmployeeAssistance = new EmployeeAssistance();

        assistance.documento = employeeAssistanceDto.documento;
        assistance.fechaHoraEntrada = new Date();
        assistance.fechaHoraSalida = null;

        return assistance;
    }
}
