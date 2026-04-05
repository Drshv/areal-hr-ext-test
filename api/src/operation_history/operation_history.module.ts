import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationHistoryService } from './operation_history.service';
import { OperationHistoryController } from './operation_history.controller';
import { OperationHistory } from './entities/operation_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperationHistory])],
  controllers: [OperationHistoryController],
  providers: [OperationHistoryService],
})
export class OperationHistoryModule {}