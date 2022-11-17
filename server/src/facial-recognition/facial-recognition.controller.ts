import { Controller, Get, HttpStatus, ValidationPipe } from '@nestjs/common';
import { Body, Patch, Post, Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { Scope } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { AuthInterface } from '../auth/auth.interface';
import { GetAuthData } from '../auth/get-user.decorator';
import { FacialRecognitionService } from './facial-recognition.service';
import { EmployeeAssistanceDto } from './dto/employeeAssistance.dto';
import { EmployeeDto } from './dto/employee.dto';

@UseGuards(AuthGuard('ApiStrategy'))
@Controller({ path: '', scope: Scope.REQUEST })
export class FacialRecognitionController {
    constructor(private facialRecognitionService: FacialRecognitionService) {}

    @Get('getEmployeeByDocument')
    async getEmployeeByDocument(@Body(ValidationPipe) employeeDto: EmployeeDto, @GetAuthData() authData: AuthInterface, @Res() res: Response) {
        const employee = await this.facialRecognitionService.getEmployeeByDocument(employeeDto, authData);

        return res.status(HttpStatus.OK).send(employee);
    }

    @Post('saveEmployeeEntry')
    async saveEmployeeEntry(@Body(ValidationPipe) employeeAssistanceDto: EmployeeAssistanceDto, @GetAuthData() authData: AuthInterface, @Res() res: Response) {
        const attendance = await this.facialRecognitionService.saveEmployeeEntry(employeeAssistanceDto, authData);

        return res.status(HttpStatus.OK).send(attendance);
    }

    @Patch('saveEmployeeOutput')
    async saveEmployeeOutput(@Body(ValidationPipe) employeeAssistanceDto: EmployeeAssistanceDto, @GetAuthData() authData: AuthInterface, @Res() res: Response) {
        const attendance = await this.facialRecognitionService.saveEmployeeOutput(employeeAssistanceDto, authData);

        return res.status(HttpStatus.OK).send(attendance);
    }
}
