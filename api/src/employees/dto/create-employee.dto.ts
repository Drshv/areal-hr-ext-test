import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsNotEmpty()
  @IsDateString()
  birth_date: string;

  @IsNotEmpty()
  @IsString()
  passport_series: string;

  @IsNotEmpty()
  @IsString()
  passport_number: string;

  @IsNotEmpty()
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