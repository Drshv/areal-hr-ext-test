import { IsString, IsUUID } from 'class-validator';

export class CreatePositionDto {
  @IsUUID()
  organization_id: string;

  @IsString()
  name: string;
}