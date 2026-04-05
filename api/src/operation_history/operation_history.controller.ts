import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperationHistoryService } from './operation_history.service';
import { CreateOperationHistoryDto } from './dto/create-operation_history.dto';
import { UpdateOperationHistoryDto } from './dto/update-operation_history.dto';

@Controller('operation_history')
export class OperationHistoryController {
  constructor(private readonly operationHistoryService: OperationHistoryService) {}

  @Post()
  create(@Body() createOperationHistoryDto: CreateOperationHistoryDto) {
    return this.operationHistoryService.create(createOperationHistoryDto);
  }

  @Get()
  findAll() {
    return this.operationHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationHistoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperationHistoryDto: UpdateOperationHistoryDto) {
    return this.operationHistoryService.update(id, updateOperationHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationHistoryService.remove(id);
  }
}
