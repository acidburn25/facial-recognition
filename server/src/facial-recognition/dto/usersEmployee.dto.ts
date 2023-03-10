import { IsOptional } from "class-validator";
import { UsersEmployeeInterface } from "../../models/interfaces/index";

export class UsersEmployeeDto implements UsersEmployeeInterface{
    @IsOptional()
	id: number;

    @IsOptional()
	document: string;

    @IsOptional()
	user: string;

    @IsOptional()
	pwd: string;

    @IsOptional()
	createdAt: Date | null;
    
    @IsOptional()
    updatedAt: Date | null;
}
