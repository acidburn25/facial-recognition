import { IsNotEmpty, IsString } from "class-validator";

export class EmployeeDto {
    @IsNotEmpty()
    @IsString()
    employee: string;
}