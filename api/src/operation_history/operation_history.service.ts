import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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

  async findAll(query: any) {
    const { object_type, object_id, page = 1, limit = 10 } = query;
    const where: any = {};

    if (object_type) where.object_type = object_type;
    if (object_id) where.object_id = object_id;

    const [data, total] = await this.operationHistoryRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const record = await this.operationHistoryRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Operation history record with id ${id} not found`);
    }
    return record;
  }

  async update(id: string, updateOperationHistoryDto: UpdateOperationHistoryDto) {
    await this.operationHistoryRepository.update(id, updateOperationHistoryDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.operationHistoryRepository.softDelete(id);
  }
}