import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Manga } from 'src/manga/entities/manga.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Manga)
        private mangaRepository: Repository<Manga>

      ){}


  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
        where: {username:username}
    });
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async addMangaToUser(user: User ,id_manga: number): Promise<User> {

    const userWithMangas = await this.userRepository.findOne({
      where: { id_user: user.id_user },
      relations: ['mangas'],  
    });


    const manga= await this.mangaRepository.findOne({
      where: { id_manga: id_manga } });

    if (user && manga) {
      userWithMangas.mangas.push(manga);
      return this.userRepository.save(userWithMangas);
    }
    throw new Error('User or Manga not found');
  }

  async findMangasByUserId(id_user: number): Promise<Manga[]> {
    const userWithMangas = await this.userRepository.findOne({
      where: { id_user: id_user },
      relations: ['mangas'],
    });
    return userWithMangas.mangas;
  }

}