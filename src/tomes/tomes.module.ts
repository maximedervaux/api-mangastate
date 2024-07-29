import { Module } from '@nestjs/common';
import { TomesService } from './tomes.service';
import { TomesController } from './tomes.controller';

@Module({
  controllers: [TomesController],
  providers: [TomesService],
})
export class TomesModule {}
