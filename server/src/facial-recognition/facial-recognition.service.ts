import { Injectable } from '@nestjs/common';
import { AuthInterface } from 'src/auth/auth.interface';
import { EntityManager } from 'typeorm';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class FacialRecognitionService {
    async saveEmployeeAttendance(employeeDto: EmployeeDto, authData: AuthInterface, entityManager: EntityManager) {

    }
}
