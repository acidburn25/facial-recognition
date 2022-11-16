import { AsistenciaEmpleado as EmployeeAssistance } from "../entities/AsistenciaEmpleado.entity";
import { EntityManager, EntityRepository, Repository } from "typeorm";
import { EmployeeDto } from "../facial-recognition/dto/employee.dto";
import { EmployeeAssistanceInterface } from "src/models/interfaces/employee-assistance.interface";
import { SaveEmployeeEntryDB } from "../models/employee-assistance/save-employee-entry.model";
import { EmployeeAssistanceObject } from "src/models/employee-assistance/employee-assistance.model";
import { BadRequestException, ConflictException, Logger } from "@nestjs/common";

@EntityRepository(EmployeeAssistance)
export class EmployeeAssistanceRepository extends Repository<EmployeeAssistance> {
    private logger = new Logger('EmployeeAssistanceRepository', { timestamp: true });

    async saveEmployeeEntry(employeeDto: EmployeeDto, entityManager: EntityManager): Promise<EmployeeAssistanceInterface> {
        const employeeEntryToSave = new SaveEmployeeEntryDB(employeeDto);
        let employeeEntrySaved: any;

        try{
            employeeEntrySaved = await entityManager.save(employeeEntryToSave);
        } catch (error) {
            this.logger.error(`Error en la query para saveEmployeeEntry`, error.stack);
            throw new BadRequestException(`Error en la query para saveEmployeeEntry`, error);
        }

        if (!employeeEntrySaved) {
            this.logger.error(`Error al intentar guardar el registro de asistencia: ${employeeDto.documento}`);
            throw new ConflictException('Error al intentar guardar el registro de asistencia');
        }

        employeeEntrySaved = new EmployeeAssistanceObject(employeeEntrySaved);

        return employeeEntrySaved;
    }
}