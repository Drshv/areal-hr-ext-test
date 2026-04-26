import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty()
  @IsUUID()
  organization_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}