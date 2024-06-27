import { Test, TestingModule } from '@nestjs/testing';
import { DemographicService } from './demographic.service';

describe('DemographicService', () => {
  let service: DemographicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemographicService],
    }).compile();

    service = module.get<DemographicService>(DemographicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
