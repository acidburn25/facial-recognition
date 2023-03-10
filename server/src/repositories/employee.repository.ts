import { BadRequestException, ConflictException, Logger } from "@nestjs/common";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { Usuarios as Users } from "../entities/Usuarios.entity";
import { EmployeeInterface } from "../models/interfaces";
import { UsersEmployeeDto } from '../facial-recognition/dto/usersEmployee.dto';

@EntityRepository(Users)
export class EmployeeRepository extends Repository<Users> {
    private logger = new Logger('EmployeeRepository', { timestamp: true });

    async getEmployeeByDocument(usersEmployeeDto: UsersEmployeeDto | any, dataSource: DataSource): Promise<EmployeeInterface> {
        let employees: any;

        try {
            employees = await dataSource.manager.findOneBy(Users, { documento: usersEmployeeDto.documento, contrasena: usersEmployeeDto.pwd });
        } catch (error) {
            this.logger.error(`Error en la query para getEmployee`, error.stack);
            throw new BadRequestException(`Error en la query para saveEmployeeEntry`, error);
        }

        if (!employees) {
            this.logger.error(`Error al intentar obtener al empleado con documento: ${usersEmployeeDto.documento}`);
            throw new ConflictException('Error al intentar obtener al empleado');
        }

        return employees;
    }
}