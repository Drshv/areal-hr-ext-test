import { PartialType } from '@nestjs/mapped-types';
import { CreateOperationHistoryDto } from './create-operation_history.dto';

export class UpdateOperationHistoryDto extends PartialType(CreateOperationHistoryDto) {}
