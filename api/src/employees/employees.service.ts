import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeesRepository.create(createEmployeeDto);
    return this.employeesRepository.save(employee);
  }

  async findAll() {
    return this.employeesRepository.find();
  }

  async findOne(id: string) {
    return this.employeesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeesRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.employeesRepository.softDelete(id);
  }
}