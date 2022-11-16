import { IsNotEmpty, IsOptional } from 'class-validator';

export class ESResponseDto {
    @IsNotEmpty()
    ok: boolean;

    @IsOptional()
    message?: string;
    
    @IsOptional()
    data?: any;
}