import { IsString, IsUUID, IsDateString, IsOptional, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateHrOperationDto {
  @IsNotEmpty()
  @IsUUID()
  employee_id: string;

  @IsNotEmpty()
  @IsString()
  operation_type: string;

  @IsNotEmpty()
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