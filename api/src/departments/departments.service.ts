import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentsRepository.create(createDepartmentDto);
    return this.departmentsRepository.save(department);
  }

  async findAll(query: any) {
    const { organization_id, name, page = 1, limit = 10 } = query;
    const where: any = {};

    if (organization_id) where.organization_id = organization_id;
    if (name) where.name = Like(`%${name}%`);

    const [data, total] = await this.departmentsRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const department = await this.departmentsRepository.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }
    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    await this.departmentsRepository.update(id, updateDepartmentDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.departmentsRepository.softDelete(id);
  }
}