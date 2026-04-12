import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll() {
    return this.hrOperationsRepository.find({
      relations: ['employee', 'department', 'position'],
    });
  }

  async findOne(id: string) {
    const operation = await this.hrOperationsRepository.findOne({
      where: { id },
      relations: ['employee', 'department', 'position'],
    });
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