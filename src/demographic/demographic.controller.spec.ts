import { Test, TestingModule } from '@nestjs/testing';
import { DemographicController } from './demographic.controller';
import { DemographicService } from './demographic.service';

describe('DemographicController', () => {
  let controller: DemographicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemographicController],
      providers: [DemographicService],
    }).compile();

    controller = module.get<DemographicController>(DemographicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
