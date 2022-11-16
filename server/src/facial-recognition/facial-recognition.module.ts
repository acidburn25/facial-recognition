import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeAssistanceRepository } from '../repositories/employeeAssistance.repository';
import { FacialRecognitionController } from './facial-recognition.controller';
import { FacialRecognitionService } from './facial-recognition.service';

@Module({
    imports: [CacheModule.register(), TypeOrmModule.forFeature([EmployeeRepository, EmployeeAssistanceRepository])],
    controllers: [FacialRecognitionController],
    providers: [FacialRecognitionService],
})
export class FacialRecognitionModule {}
