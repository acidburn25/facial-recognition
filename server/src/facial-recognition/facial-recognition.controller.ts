import { Controller, Get, HttpStatus, ValidationPipe } from '@nestjs/common';
import { Body, Patch, Post, Query, Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { Scope } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { AuthInterface } from '../auth/auth.interface';
import { GetAuthData } from '../auth/get-user.decorator';
import { FacialRecognitionService } from './facial-recognition.service';
import { EmployeeAssistanceDto } from './dto/employeeAssistance.dto';
import { UsersEmployeeDto } from './dto/usersEmployee.dto';

//@UseGuards(AuthGuard('jwt'))
@Controller({ path: '', scope: Scope.REQUEST })
export class FacialRecognitionController {
    constructor(private facialRecognitionService: FacialRecognitionService) {}

    @Post('getUserEmployee')
    async getUserEmployee(@Body() userEmployeeDto: any, @GetAuthData() authData: AuthInterface, @Res() res: Response) {
        const employee = await this.facialRecognitionService.getUserEmployee(userEmployeeDto, authData);

        return res.status(HttpStatus.OK).send(employee);
    }

    @Post('createUserEmployee')
    async createUserEmployee(@Body() usersEmployeeDto: any, @GetAuthData() authData: AuthInterface, @Res() res: Response) {
        const user = await this.facialRecognitionService.createUserEmployee(usersEmployeeDto, authData);

        return res.status(HttpStatus.OK).send(user);
    }

    @Post('saveEmployeeEntry')
    async saveEmployeeEntry(@Body() employeeAssistanceDto: EmployeeAssistanceDto, @GetAuthData() authData: AuthInterface, @Res() res: Response) {
        console.log('aaaaa');
        const attendance = await this.facialRecognitionService.saveEmployeeEntry(employeeAssistanceDto, authData);

        return res.status(HttpStatus.OK).send(attendance);
    }

    @Patch('saveEmployeeOutput')
    async saveEmployeeOutput(@Body() employeeAssistanceDto: EmployeeAssistanceDto, @GetAuthData() authData: AuthInterface, @Res() res: Response) {
        const attendance = await this.facialRecognitionService.saveEmployeeOutput(employeeAssistanceDto, authData);

        return res.status(HttpStatus.OK).send(attendance);
    }
}
