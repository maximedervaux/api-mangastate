import { Injectable, NotFoundException } from '@nestjs/common';
import { Manga } from 'src/manga/entities/manga.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Auteur } from 'src/auteur/entities/auteur.entity';

@Injectable()
export class JikanService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Auteur)
    private readonly auteurRepository: Repository<Auteur>,
  ) {}

  private mapJikanResponseToManga(data: any): Manga {
    const newManga = new Manga();
    newManga.title_manga = data.title || null; 
    newManga.description_manga = data.synopsis || null;
    newManga.cover_image_manga = data.images?.jpg?.image_url || null;
    newManga.release_date_manga = data.published?.from ? new Date(data.published.from) : null;
  
    return newManga;
  }

  private async findOrCreateGenre(name: string): Promise<Genre> {
    let genre = await this.genreRepository.findOne({ where: { name_genre: name } });
    if (!genre) {
      genre = new Genre();
      genre.name_genre = name;
      genre = await this.genreRepository.save(genre);
    }
    return genre;
  }

  private async findOrCreateAuteur(name: string): Promise<Auteur> {
    let auteur = await this.auteurRepository.findOne({ where: { name: name } });
    if (!auteur) {
      auteur = new Auteur();
      auteur.name = name;
      auteur = await this.auteurRepository.save(auteur);
    }
    return auteur;
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

      // Genre
      if (mangaData.genres) {
        const genres = await Promise.all(
          mangaData.genres.map((genreData: any) => this.findOrCreateGenre(genreData.name))
        );
        newManga.genres = genres.length > 0 ? genres : null;
      }
      
      // Auteur
      if (mangaData.authors) {
        const auteurs = await Promise.all(
          mangaData.authors.map((auteurData: any) => this.findOrCreateAuteur(auteurData.name))
        );
        newManga.auteurs = auteurs.length > 0 ? auteurs : null;
      }
  
      mangaList.push(newManga);
    }
  
    return mangaList;
  }
}
