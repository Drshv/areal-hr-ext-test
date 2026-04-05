import { Test, TestingModule } from '@nestjs/testing';
import { OperationHistoryController } from './operation_history.controller';
import { OperationHistoryService } from './operation_history.service';

describe('OperationHistoryController', () => {
  let controller: OperationHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationHistoryController],
      providers: [OperationHistoryService],
    }).compile();

    controller = module.get<OperationHistoryController>(OperationHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
