import { Module } from '@nestjs/common';
import { DemographicService } from './demographic.service';
import { DemographicController } from './demographic.controller';
import { Demographic } from './entities/demographic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Demographic])],
  controllers: [DemographicController],
  providers: [DemographicService],
  exports: [TypeOrmModule]
})
export class DemographicModule {}
