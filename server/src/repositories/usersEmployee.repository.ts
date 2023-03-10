import { Usuarios as Users } from '../entities/Usuarios.entity';
import { DataSource, EntityRepository, Like, Repository } from 'typeorm';
import { UsersEmployeeInterface } from '../models/interfaces/index';
import { EmployeeAssistanceObject } from '../models/employee-assistance/employee-assistance.model';
import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';
import { UsersEmployeeDto } from '../facial-recognition/dto/usersEmployee.dto';
import { CreateUserEmployeeDB } from '../models/users/users-register.model';

//@Injectable()
@EntityRepository(Users)
export class UsersEmployeeRepository extends Repository<Users> {
    private logger = new Logger('UsersEmployeeRepository', { timestamp: true });

    async createUserEmployee(usersEmployeeDto: UsersEmployeeDto, dataSource: DataSource): Promise<UsersEmployeeInterface> {
        const userEmployeeToSave = new CreateUserEmployeeDB(usersEmployeeDto);
        let userEmployeeSaved: any;

        try {
            userEmployeeSaved = await dataSource.manager.save(userEmployeeToSave);
        } catch (error) {
            this.logger.error(`Error en la query para createUserEmployee`, error.stack);
            throw new BadRequestException(`Error en la query para createUserEmployee`, error);
        }

        if (!userEmployeeSaved) {
            this.logger.error(`Error al intentar guardar el registro del usuario: ${usersEmployeeDto.document}`);
            throw new ConflictException('Error al intentar guardar el registro del usuario');
        }

        userEmployeeSaved = new EmployeeAssistanceObject(userEmployeeSaved);

        return userEmployeeSaved;
    }
}
