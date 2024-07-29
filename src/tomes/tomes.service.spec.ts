import { Test, TestingModule } from '@nestjs/testing';
import { TomesService } from './tomes.service';

describe('TomesService', () => {
  let service: TomesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TomesService],
    }).compile();

    service = module.get<TomesService>(TomesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
