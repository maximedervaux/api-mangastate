import { Injectable, NotFoundException } from '@nestjs/common';
import { Manga } from 'src/manga/entities/manga.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Auteur } from 'src/auteur/entities/auteur.entity';
import { Theme } from 'src/theme/entities/theme.entity';
import { Demographic } from 'src/demographic/entities/demographic.entity';

@Injectable()
export class JikanService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Auteur)
    private readonly auteurRepository: Repository<Auteur>,
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
    @InjectRepository(Demographic)
    private readonly demographicRepository: Repository<Demographic>,
  ) {}

  private mapJikanResponseToManga(data: any): Manga {
    const newManga = new Manga();
    newManga.title_manga = data.title || null; 
    newManga.description_manga = data.synopsis || null;
    newManga.cover_image_manga = data.images?.jpg?.image_url || null;
    newManga.chapter = data.chapters || null ;
    newManga.date_deb = data.published?.from ? new Date(data.published.from) : null;
    newManga.date_fin = data.published?.to ? new Date(data.published.to) : null;
    newManga.status = data.status
  
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

  private async findOrCreateTheme(name: string): Promise<Theme> {
    let theme = await this.themeRepository.findOne({ where: { name: name } });
    if (!theme) {
      theme = new Theme();
      theme.name = name;
      theme = await this.themeRepository.save(theme);
    }
    return theme;
  }

  private async findOrCreateDemographic(name: string): Promise<Demographic> {
    let demographic = await this.demographicRepository.findOne({ where: { name: name } });
    if (!demographic) {
      demographic = new Demographic();
      demographic.name = name;
      demographic = await this.demographicRepository.save(demographic);
    }
    return demographic;
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

      //Theme 
      if (mangaData.themes) {
        const themes = await Promise.all(
          mangaData.themes.map((themeData: any) => this.findOrCreateTheme(themeData.name))
        );
        newManga.themes = themes.length > 0 ? themes : null;
      }

      //Demographics
      if (mangaData.demographics) {
        const demographics = await Promise.all(
          mangaData.demographics.map((demographicData: any) => this.findOrCreateDemographic(demographicData.name))
        );
        newManga.demographics = demographics.length > 0 ? demographics : null;
      }
      


      mangaList.push(newManga);
    }
  
    return mangaList;
  }
}
