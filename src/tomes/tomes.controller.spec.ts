import { Test, TestingModule } from '@nestjs/testing';
import { TomesController } from './tomes.controller';
import { TomesService } from './tomes.service';

describe('TomesController', () => {
  let controller: TomesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TomesController],
      providers: [TomesService],
    }).compile();

    controller = module.get<TomesController>(TomesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
