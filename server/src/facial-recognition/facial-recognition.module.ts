import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoRepository } from '../repositories/employee.repository';
import { AsistenciaEmpleadoRepository } from '../repositories/employeeAssistance.repository';
import { FacialRecognitionController } from './facial-recognition.controller';
import { FacialRecognitionService } from './facial-recognition.service';

@Module({
    imports: [CacheModule.register(), TypeOrmModule.forFeature([AsistenciaEmpleadoRepository, EmpleadoRepository])],
    controllers: [FacialRecognitionController],
    providers: [FacialRecognitionService],
})
export class FacialRecognitionModule {}
