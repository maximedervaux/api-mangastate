import { Injectable } from '@nestjs/common';
import { CreateAuteurDto } from './dto/create-auteur.dto';
import { UpdateAuteurDto } from './dto/update-auteur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auteur } from './entities/auteur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuteurService {

  constructor(
    @InjectRepository(Auteur)
    private auteurRepository: Repository<Auteur>,
  ){

}
  create(createAuteurDto: CreateAuteurDto) {
    return 'This action adds a new auteur';
  }

  findAll() {
    return this.auteurRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auteur`;
  }

  update(id: number, updateAuteurDto: UpdateAuteurDto) {
    return `This action updates a #${id} auteur`;
  }

  remove(id: number) {
    return `This action removes a #${id} auteur`;
  }
}
