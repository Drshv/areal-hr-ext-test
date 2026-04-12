import { IsString, IsOptional, IsDateString, IsUUID } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  last_name: string;

  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsDateString()
  birth_date: string;

  @IsString()
  passport_series: string;

  @IsString()
  passport_number: string;

  @IsDateString()
  passport_issue_date: string;

  @IsOptional()
  @IsString()
  passport_division_code?: string;

  @IsOptional()
  @IsString()
  passport_issued_by?: string;

  @IsOptional()
  @IsString()
  registration_region?: string;

  @IsOptional()
  @IsString()
  registration_locality?: string;

  @IsOptional()
  @IsString()
  registration_street?: string;

  @IsOptional()
  @IsString()
  registration_house?: string;

  @IsOptional()
  @IsString()
  registration_building?: string;

  @IsOptional()
  @IsString()
  registration_apartment?: string;
}