import { Injectable } from '@nestjs/common';
import { CreateDemographicDto } from './dto/create-demographic.dto';
import { UpdateDemographicDto } from './dto/update-demographic.dto';

@Injectable()
export class DemographicService {
  create(createDemographicDto: CreateDemographicDto) {
    return 'This action adds a new demographic';
  }

  findAll() {
    return `This action returns all demographic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} demographic`;
  }

  update(id: number, updateDemographicDto: UpdateDemographicDto) {
    return `This action updates a #${id} demographic`;
  }

  remove(id: number) {
    return `This action removes a #${id} demographic`;
  }
}
