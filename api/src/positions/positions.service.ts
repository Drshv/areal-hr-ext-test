import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    const position = this.positionsRepository.create(createPositionDto);
    return this.positionsRepository.save(position);
  }

  async findAll() {
    return this.positionsRepository.find();
  }

  async findOne(id: string) {
    return this.positionsRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePositionDto: UpdatePositionDto) {
    await this.positionsRepository.update(id, updatePositionDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.positionsRepository.softDelete(id);
  }
}