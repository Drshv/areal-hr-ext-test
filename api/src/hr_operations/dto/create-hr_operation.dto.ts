import { IsString, IsUUID, IsDateString, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateHrOperationDto {
  @IsUUID()
  employee_id: string;

  @IsString()
  operation_type: string;

  @IsDateString()
  operation_date: string;

  @IsOptional()
  @IsUUID()
  department_id?: string;

  @IsOptional()
  @IsUUID()
  position_id?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  salary?: number;

  @IsOptional()
  @IsString()
  dismiss_reason?: string;
}