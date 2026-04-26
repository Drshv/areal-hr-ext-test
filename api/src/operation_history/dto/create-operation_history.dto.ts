import { IsString, IsUUID, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateOperationHistoryDto {
  @IsNotEmpty()
  @IsDateString()
  operation_datetime: string;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  object_type: string;

  @IsNotEmpty()
  @IsUUID()
  object_id: string;

  @IsNotEmpty()
  @IsString()
  field_name: string;

  @IsOptional()
  @IsString()
  old_value?: string;

  @IsOptional()
  @IsString()
  new_value?: string;
}