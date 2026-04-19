import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  last_name: string;

  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsUUID()
  role_id?: string;
}