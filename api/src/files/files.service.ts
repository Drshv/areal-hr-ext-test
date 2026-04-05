import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll() {
    return this.filesRepository.find();
  }

  async findOne(id: string) {
    return this.filesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    await this.filesRepository.update(id, updateFileDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.filesRepository.softDelete(id);
  }
}