import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrOperationsService } from './hr_operations.service';
import { HrOperationsController } from './hr_operations.controller';
import { HrOperation } from './entities/hr_operation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HrOperation])],
  controllers: [HrOperationsController],
  providers: [HrOperationsService],
})
export class HrOperationsModule {}