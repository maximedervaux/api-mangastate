import { Injectable} from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { Manga } from './entities/manga.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { JikanService } from 'src/jikan/jikan.service';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private mangasRepository: Repository<Manga>,
    private readonly jikanService: JikanService
  ){}

  create(createMangaDto: CreateMangaDto) {
    return 'This action adds a new manga';
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Manga>> {
    return paginate<Manga>(this.mangasRepository, options);
  }

  async findOne(id: number) {

    let result = this.mangasRepository.findOneBy({id_manga : id});
    return result;
  }

  async findByTitle(title){
    const manga = await this.mangasRepository.find({ where: { title_manga: Like(`%${title}%`) } });
    return manga;
  }

  
  async findByTitleExtra(title: string): Promise<Manga[]> {
    const manga = await this.findByTitle(title)
  
    if (manga.length > 0) {
      return manga;
    }
  
    const newMangas = await this.jikanService.fetchAndMapManga(title);
  
    const mangasSaved: Manga[] = [];
    for (const newManga of newMangas) {
      const existingManga = await this.mangasRepository.findOne({ where: { title_manga: newManga.title_manga } });
      if (!existingManga) {
        const savedManga = await this.mangasRepository.save(newManga);
        mangasSaved.push(savedManga);
      }
    }
  
    return mangasSaved;
  }

  update(id: number, updateMangaDto: UpdateMangaDto) {
    return `This action updates a #${id} manga`;
  }

  remove(id: number) {
    return `This action removes a #${id} manga`;
  }



}
