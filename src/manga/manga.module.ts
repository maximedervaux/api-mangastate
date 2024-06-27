import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from './entities/manga.entity';
import { HttpModule } from '@nestjs/axios';
import { JikanService } from 'src/jikan/jikan.service';
import { GenreModule } from 'src/genre/genre.module';
import { AuteurModule } from 'src/auteur/auteur.module';
import { DemographicModule } from 'src/demographic/demographic.module';
import { ThemeModule } from 'src/theme/theme.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manga]),HttpModule,GenreModule,AuteurModule,DemographicModule,ThemeModule],
  controllers: [MangaController],
  providers: [MangaService,JikanService],
})
export class MangaModule {}
