import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  file_path: string;

  @IsUUID()
  employee_id: string;
}