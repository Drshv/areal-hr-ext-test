import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  async create(createUserDto: CreateUserDto) {
    const existing = await this.usersRepository.findOne({
      where: { login: createUserDto.login },
    });
    if (existing) {
      throw new ConflictException('Login already exists');
    }

    const password_hash = this.hashPassword(createUserDto.password);
    const user = this.usersRepository.create({
      ...createUserDto,
      password_hash,
    });
    return this.usersRepository.save(user);
  }

  async findAll(query: any) {
    const { login, last_name, page = 1, limit = 10 } = query;
    const where: any = {};

    if (login) where.login = Like(`%${login}%`);
    if (last_name) where.last_name = Like(`%${last_name}%`);

    const [data, total] = await this.usersRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByLogin(login: string) {
    return this.usersRepository.findOne({ where: { login } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto['password_hash'] = this.hashPassword(updateUserDto.password);
      delete updateUserDto.password;
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.usersRepository.softDelete(id);
  }

  async updateLastLogin(id: string) {
    await this.usersRepository.update(id, { last_login_at: new Date() });
  }
}