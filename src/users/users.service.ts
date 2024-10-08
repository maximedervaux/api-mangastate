import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
      ){}


  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
        where: {username:username}
    });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  
}