import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  file_path: string;

  @IsNotEmpty()
  @IsUUID()
  employee_id: string;
}