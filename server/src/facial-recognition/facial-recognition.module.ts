import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository, EmployeeAssistanceRepository, UsersEmployeeRepository } from '../repositories/index';
import { FacialRecognitionController } from './facial-recognition.controller';
import { FacialRecognitionService } from './facial-recognition.service';
import { AsistenciaEmpleado as EmployeeAssistance } from '../entities/AsistenciaEmpleado.entity';
import { Empleado as Employee } from '../entities/Empleado.entity';
import { Usuarios as Users } from '../entities/Usuarios.entity';

@Module({
    imports: [CacheModule.register(), TypeOrmModule.forFeature([EmployeeAssistanceRepository, EmployeeRepository, UsersEmployeeRepository, EmployeeAssistance, Employee, Users])],
    controllers: [FacialRecognitionController],
    providers: [FacialRecognitionService, EmployeeAssistanceRepository, EmployeeRepository, UsersEmployeeRepository],
})
export class FacialRecognitionModule {}
