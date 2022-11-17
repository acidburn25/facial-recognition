import { BadRequestException, ConflictException, Logger } from "@nestjs/common";
import { EmployeeDto } from "../facial-recognition/dto/employee.dto";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { Empleado as Employee } from "../entities/Empleado.entity";
import { EmployeeInterface } from "../models/interfaces";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
    private logger = new Logger('EmployeeRepository', { timestamp: true });

    async getEmployeeByDocument(employeeDto: EmployeeDto | any, dataSource: DataSource): Promise<EmployeeInterface> {
        let employees: any;

        try {
            employees = await dataSource.manager.findOneBy(Employee, { documento: employeeDto.documento });
        } catch (error) {
            this.logger.error(`Error en la query para getEmployee`, error.stack);
            throw new BadRequestException(`Error en la query para saveEmployeeEntry`, error);
        }

        if (!employees) {
            this.logger.error(`Error al intentar obtener al empleado con documento: ${employeeDto.documento}`);
            throw new ConflictException('Error al intentar obtener al empleado');
        }

        return employees;
    }
}