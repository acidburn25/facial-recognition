import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository, EmployeeAssistanceRepository } from '../repositories/index';
import { FacialRecognitionController } from './facial-recognition.controller';
import { FacialRecognitionService } from './facial-recognition.service';
import { AsistenciaEmpleado as EmployeeAssistance } from '../entities/AsistenciaEmpleado.entity';
import { Empleado as Employee } from '../entities/Empleado.entity';

@Module({
    imports: [CacheModule.register(), TypeOrmModule.forFeature([EmployeeAssistanceRepository, EmployeeRepository, EmployeeAssistance, Employee])],
    controllers: [FacialRecognitionController],
    providers: [FacialRecognitionService, EmployeeAssistanceRepository, EmployeeRepository],
})
export class FacialRecognitionModule {}
