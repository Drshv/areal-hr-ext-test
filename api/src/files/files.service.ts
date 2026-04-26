import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async create(createFileDto: CreateFileDto) {
    const file = this.filesRepository.create(createFileDto);
    return this.filesRepository.save(file);
  }

  async findAll(query: any) {
    const { employee_id, name, page = 1, limit = 10 } = query;
    const where: any = {};

    if (employee_id) where.employee_id = employee_id;
    if (name) where.name = Like(`%${name}%`);

    const [data, total] = await this.filesRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const file = await this.filesRepository.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return file;
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    await this.filesRepository.update(id, updateFileDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.filesRepository.softDelete(id);
  }
}