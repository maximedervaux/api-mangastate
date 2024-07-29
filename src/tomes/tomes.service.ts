import { Injectable } from '@nestjs/common';
import { CreateTomeDto } from './dto/create-tome.dto';
import { UpdateTomeDto } from './dto/update-tome.dto';

@Injectable()
export class TomesService {
  create(createTomeDto: CreateTomeDto) {
    return 'This action adds a new tome';
  }

  findAll() {
    return `This action returns all tomes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tome`;
  }

  update(id: number, updateTomeDto: UpdateTomeDto) {
    return `This action updates a #${id} tome`;
  }

  remove(id: number) {
    return `This action removes a #${id} tome`;
  }
}
