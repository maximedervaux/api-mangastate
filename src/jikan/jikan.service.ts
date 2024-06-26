import { Injectable, NotFoundException } from '@nestjs/common';
import { Manga } from 'src/manga/entities/manga.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class JikanService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  private mapJikanResponseToManga(data: any): Manga {
    const newManga = new Manga();
    newManga.title_manga = data.title || null; 
    newManga.author_manga = data.authors?.[0]?.name || null; 
    newManga.description_manga = data.synopsis || null;
    newManga.cover_image_manga = data.images?.jpg?.image_url || null;
    newManga.release_date_manga = data.published?.from ? new Date(data.published.from) : null;
  
    return newManga;
  }
  
  async fetchAndMapManga(title: string): Promise<Manga[]> {
    const apiUrl = `https://api.jikan.moe/v4/manga?q=${title}`;
    const response = await this.httpService.get(apiUrl).toPromise();
  
    const mangaList: Manga[] = [];
  
    if (!response.data.data.length) {
      throw new NotFoundException('Manga not found');
    }
  
    for (const mangaData of response.data.data) {
      const newManga = this.mapJikanResponseToManga(mangaData);
  
      if (mangaData.genres) {
        const genres = [];
        for (const genreData of mangaData.genres) {
          let genre = await this.genreRepository.findOne({ where: { name_genre: genreData.name } });
  
          if (!genre) {
            genre = new Genre();
            genre.name_genre = genreData.name || null; 
            genre = await this.genreRepository.save(genre);
          }
  
          genres.push(genre);
        }
  
        newManga.genres = genres.length > 0 ? genres : null;
      }
  
      mangaList.push(newManga);
    }
  
    return mangaList;
  }
}  