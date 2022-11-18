import { AsistenciaEmpleado as EmployeeAssistance } from '../entities/AsistenciaEmpleado.entity';
import { DataSource, EntityRepository, Like, Repository } from 'typeorm';
import { EmployeeAssistanceDto } from '../facial-recognition/dto/employeeAssistance.dto';
import { EmployeeAssistanceInterface } from '../models/interfaces/index';
import { SaveEmployeeEntryDB } from '../models/employee-assistance/save-employee-entry.model';
import { EmployeeAssistanceObject } from '../models/employee-assistance/employee-assistance.model';
import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';

@Injectable()
@EntityRepository(EmployeeAssistance)
export class EmployeeAssistanceRepository extends Repository<EmployeeAssistance> {
    private logger = new Logger('EmployeeAssistanceRepository', { timestamp: true });

    async saveEmployeeEntry(employeeAssistanceDto: EmployeeAssistanceDto, dataSource: DataSource): Promise<EmployeeAssistanceInterface> {
        const employeeEntryToSave = new SaveEmployeeEntryDB(employeeAssistanceDto);
        let employeeEntrySaved: any;

        try {
            employeeEntrySaved = await dataSource.manager.save(employeeEntryToSave);
        } catch (error) {
            this.logger.error(`Error en la query para saveEmployeeEntry`, error.stack);
            throw new BadRequestException(`Error en la query para saveEmployeeEntry`, error);
        }

        if (!employeeEntrySaved) {
            this.logger.error(`Error al intentar guardar el registro de asistencia: ${employeeAssistanceDto.documento}`);
            throw new ConflictException('Error al intentar guardar el registro de asistencia');
        }

        employeeEntrySaved = new EmployeeAssistanceObject(employeeEntrySaved);

        return employeeEntrySaved;
    }

    async saveEmployeeOutput(employeeAssistanceDto: EmployeeAssistanceDto, dataSource: DataSource): Promise<EmployeeAssistanceInterface> {
        const date: Date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        let dateOutput: any = new Date(year, month, day);
        dateOutput = dateOutput.toISOString().slice(0, 10);
        let employeeOutputToSave: any;
        let employeeOutputSaved: any;

        try {
            employeeOutputToSave = await dataSource.manager.findOneBy(EmployeeAssistance, { documento: employeeAssistanceDto.documento, fechaHoraEntrada: Like(`${dateOutput}%`)});
            employeeOutputToSave.fechaHoraSalida = date;
            employeeOutputSaved = await dataSource.manager.save(employeeOutputToSave);
        } catch (error) {
            this.logger.error(`Error en la query para saveEmployeeOutput`, error.stack);
            throw new BadRequestException(`Error en la query para saveEmployeeOutput`, error);
        }

        if (!employeeOutputSaved) {
            this.logger.error(`Error al intentar guardar el registro de asistencia: ${employeeAssistanceDto.documento}`);
            throw new ConflictException('Error al intentar guardar el registro de asistencia');
        }

        return employeeOutputSaved;
    }
}
