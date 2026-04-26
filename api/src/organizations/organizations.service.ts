import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.organizationsRepository.create(createOrganizationDto);
    return this.organizationsRepository.save(organization);
  }

  async findAll(query: any) {
    const { name, page = 1, limit = 10 } = query;
    const where: any = {};

    if (name) where.name = Like(`%${name}%`);

    const [data, total] = await this.organizationsRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const organization = await this.organizationsRepository.findOne({ where: { id } });
    if (!organization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }
    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    await this.organizationsRepository.update(id, updateOrganizationDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.organizationsRepository.softDelete(id);
  }
}