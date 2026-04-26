import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { HrOperation } from './entities/hr_operation.entity';
import { CreateHrOperationDto } from './dto/create-hr_operation.dto';
import { UpdateHrOperationDto } from './dto/update-hr_operation.dto';

@Injectable()
export class HrOperationsService {
  constructor(
    @InjectRepository(HrOperation)
    private hrOperationsRepository: Repository<HrOperation>,
  ) {}

  async create(createHrOperationDto: CreateHrOperationDto) {
    const operation = this.hrOperationsRepository.create(createHrOperationDto);
    return this.hrOperationsRepository.save(operation);
  }

  async findAll(query: any) {
    const { employee_id, operation_type, page = 1, limit = 10 } = query;
    const where: any = {};

    if (employee_id) where.employee_id = employee_id;
    if (operation_type) where.operation_type = Like(`%${operation_type}%`);

    const [data, total] = await this.hrOperationsRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const operation = await this.hrOperationsRepository.findOne({ where: { id } });
    if (!operation) {
      throw new NotFoundException(`HR operation with id ${id} not found`);
    }
    return operation;
  }

  async update(id: string, updateHrOperationDto: UpdateHrOperationDto) {
    await this.hrOperationsRepository.update(id, updateHrOperationDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.hrOperationsRepository.softDelete(id);
  }
}