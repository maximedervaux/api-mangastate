import { Test, TestingModule } from '@nestjs/testing';
import { JikanService } from './jikan.service';

describe('JikanService', () => {
  let service: JikanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JikanService],
    }).compile();

    service = module.get<JikanService>(JikanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
