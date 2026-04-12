import { IsString, IsUUID, IsDateString, IsOptional } from 'class-validator';

export class CreateOperationHistoryDto {
  @IsDateString()
  operation_datetime: string;

  @IsUUID()
  user_id: string;

  @IsString()
  object_type: string;

  @IsUUID()
  object_id: string;

  @IsString()
  field_name: string;

  @IsOptional()
  @IsString()
  old_value?: string;

  @IsOptional()
  @IsString()
  new_value?: string;
}