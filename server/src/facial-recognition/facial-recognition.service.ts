import { Injectable, Scope } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { AuthInterface } from '../auth/auth.interface';
import { ESResponseDto } from '../dto/esResponse.dto';
import { EmployeeRepository, EmployeeAssistanceRepository, UsersEmployeeRepository } from '../repositories/index';
import { DataSource } from 'typeorm';
import { EmployeeAssistanceDto } from './dto/employeeAssistance.dto';
import { ConfigService } from '../config/config.service';
import { UsersEmployeeDto } from './dto/usersEmployee.dto';

@Injectable({ scope: Scope.REQUEST })
export class FacialRecognitionService {
    private logger = new Logger('FacialRecognitionService', { timestamp: true });
    dataSource: DataSource;

    constructor(
        private readonly employeeRepository: EmployeeRepository,
        private readonly employeeAssistanceRepository: EmployeeAssistanceRepository,
        private readonly usersEmployeeRepository: UsersEmployeeRepository,
    ) {}

    async getUserEmployee(usersEmployeeDto: UsersEmployeeDto | any, authData: AuthInterface): Promise<ESResponseDto> {
        await this.dataSourceManager();
        const assistance = await this.employeeRepository.getEmployeeByDocument(usersEmployeeDto, this.dataSource);

        return { ok: true, data: assistance, message: 'Get employee Ok!' };
    }

    async createUserEmployee(usersEmployeeDto: UsersEmployeeDto, authData: AuthInterface): Promise<ESResponseDto> {
        await this.dataSourceManager();
        const user = await this.usersEmployeeRepository.createUserEmployee(usersEmployeeDto, this.dataSource);

        return { ok: true, data: user, message: 'Create user employee Ok!' };
    }

    async saveEmployeeEntry(employeeAssistanceDto: EmployeeAssistanceDto, authData: AuthInterface): Promise<ESResponseDto> {
        await this.dataSourceManager();
        const assistance = await this.employeeAssistanceRepository.saveEmployeeEntry(employeeAssistanceDto, this.dataSource);

        return { ok: true, data: assistance, message: 'Save employee entry Ok!' };
    }

    async saveEmployeeOutput(employeeAssistanceDto: EmployeeAssistanceDto, authData: AuthInterface): Promise<ESResponseDto> {
        await this.dataSourceManager();
        const assistance = await this.employeeAssistanceRepository.saveEmployeeOutput(employeeAssistanceDto, this.dataSource);

        return { ok: true, data: assistance, message: 'Save employee output Ok!' };
    }

    async dataSourceManager() {
        const configService = new ConfigService();
        this.dataSource = new DataSource(await configService.getDataSourceOptions());
        await this.dataSource.initialize();
    }
}
