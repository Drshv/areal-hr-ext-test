import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationHistory } from './entities/operation_history.entity';
import { CreateOperationHistoryDto } from './dto/create-operation_history.dto';
import { UpdateOperationHistoryDto } from './dto/update-operation_history.dto';

@Injectable()
export class OperationHistoryService {
  constructor(
    @InjectRepository(OperationHistory)
    private operationHistoryRepository: Repository<OperationHistory>,
  ) {}

  async create(createOperationHistoryDto: CreateOperationHistoryDto) {
    const record = this.operationHistoryRepository.create(createOperationHistoryDto);
    return this.operationHistoryRepository.save(record);
  }

  async findAll() {
    return this.operationHistoryRepository.find();
  }

  async findOne(id: string) {
    return this.operationHistoryRepository.findOne({ where: { id } });
  }

  async update(id: string, updateOperationHistoryDto: UpdateOperationHistoryDto) {
    await this.operationHistoryRepository.update(id, updateOperationHistoryDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.operationHistoryRepository.delete(id);
  }
}