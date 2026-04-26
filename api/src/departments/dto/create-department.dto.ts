import { IsString, IsUUID, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsUUID()
  organization_id: string;

  @IsOptional()
  @IsUUID()
  parent_id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  comment?: string;
}