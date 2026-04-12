import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @IsUUID()
  organization_id: string;

  @IsOptional()
  @IsUUID()
  parent_id?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  comment?: string;
}