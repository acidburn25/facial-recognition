import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthInterface } from 'src/auth/auth.interface';
import { ESResponseDto } from 'src/dto/esResponse.dto';
import { EmployeeAssistanceInterface } from 'src/models/interfaces/employee-assistance.interface';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import { EmployeeAssistanceRepository } from 'src/repositories/employeeAssistance.repository';
import { EntityManager } from 'typeorm';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class FacialRecognitionService {
    private logger = new Logger('FacialRecognitionService', { timestamp: true });
    assistance: EmployeeAssistanceInterface;
    entityManager: EntityManager;

    constructor(
        @InjectRepository(EmployeeRepository)
        private readonly employeeRepository: EmployeeRepository,
        @InjectRepository(EmployeeAssistanceRepository)
        private readonly employeeAssistanceRepository: EmployeeAssistanceRepository,
    ) {}

    async saveEmployeeEntry(employeeDto: EmployeeDto, authData: AuthInterface, entityManager: EntityManager): Promise<ESResponseDto> {
        this.assistance = await this.employeeAssistanceRepository.saveEmployeeEntry(employeeDto, entityManager);

        return {ok: true, data: this.assistance, message: 'Save employee entry Ok!'}
    }

    async saveEmployeeOutput(employeeDto: EmployeeDto, authData: AuthInterface, entityManager: EntityManager): Promise<ESResponseDto> {
        return {ok: true, data: this.assistance, message: 'Save employee output Ok!'}
    }
}
