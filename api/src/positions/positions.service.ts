import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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

  async findAll(query: any) {
    const { organization_id, name, page = 1, limit = 10 } = query;
    const where: any = {};

    if (organization_id) where.organization_id = organization_id;
    if (name) where.name = Like(`%${name}%`);

    const [data, total] = await this.positionsRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const position = await this.positionsRepository.findOne({ where: { id } });
    if (!position) {
      throw new NotFoundException(`Position with id ${id} not found`);
    }
    return position;
  }

  async update(id: string, updatePositionDto: UpdatePositionDto) {
    await this.positionsRepository.update(id, updatePositionDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.positionsRepository.softDelete(id);
  }
}