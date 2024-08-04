import { Injectable } from '@nestjs/common';
import { CreateDemographicDto } from './dto/create-demographic.dto';
import { UpdateDemographicDto } from './dto/update-demographic.dto';
import { Demographic } from './entities/demographic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DemographicService {
  
  constructor(
    @InjectRepository(Demographic)
    private demographicRepository: Repository<Demographic>,
  ){}


  create(createDemographicDto: CreateDemographicDto) {
    return 'This action adds a new demographic';
  }

  findAll() {
    return this.demographicRepository.find();
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
