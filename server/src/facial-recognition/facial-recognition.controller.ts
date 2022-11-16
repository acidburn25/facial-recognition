import { Controller, HttpStatus } from '@nestjs/common';
import { Body, Post, Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { Scope } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { AuthInterface } from 'src/auth/auth.interface';
import { GetAuthData } from 'src/auth/get-user.decorator';
import { FacialRecognitionService } from './facial-recognition.service';
import { getConnection } from 'typeorm';
import { EmployeeDto } from './dto/employee.dto';

@UseGuards(AuthGuard('ApiStrategy'))
@Controller({ path: '', scope: Scope.REQUEST })
export class FacialRecognitionController {
    constructor(private facialRecognitionService: FacialRecognitionService) {}

    @Post('saveEmployeeAttendance')
    async saveEmployeeAttendance(@Body() employeeDto: EmployeeDto, @GetAuthData() authData: AuthInterface, @Res() res: Response){
        const connection = getConnection();

        return await connection.manager.transaction(async (entityManager) => {
            const attendance = await this.facialRecognitionService.saveEmployeeAttendance(employeeDto, authData, entityManager);
            return res.status(HttpStatus.OK).send(attendance);
        })
    }
}
