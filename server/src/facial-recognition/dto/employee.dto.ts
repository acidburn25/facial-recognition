import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EmployeeDto {
    @IsNotEmpty()
    @IsString()
    employee: string;

    @IsNotEmpty()
    @IsNumber()
    recordType: number;
}