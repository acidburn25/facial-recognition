import { AsistenciaEmpleado as EmployeeAssistance } from 'src/entities/AsistenciaEmpleado.entity';
import { EmployeeDto } from 'src/facial-recognition/dto/employee.dto';
import { EmployeeAssistanceInterface } from '../interfaces/employee-assistance.interface';

export class SaveEmployeeEntryDB {
    constructor(employeeDto: EmployeeDto | EmployeeAssistanceInterface) {
        const assistance: EmployeeAssistance = new EmployeeAssistance();

        assistance.documento = employeeDto.documento;
        assistance.fechaHoraEntrada = employeeDto.fechaHoraEntrada;
        assistance.fechaHoraSalida = employeeDto.fechaHoraSalida;
        assistance.createdAt = new Date();
        assistance.updatedAt = new Date();

        return assistance;
    }
}
