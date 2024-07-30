import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { MangaModule } from './manga/manga.module';
import { Manga } from './manga/entities/manga.entity';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/entities/genre.entity';
import { JikanService } from './jikan/jikan.service';
import { AuteurModule } from './auteur/auteur.module';
import { ThemeModule } from './theme/theme.module';
import { DemographicModule } from './demographic/demographic.module';
import { Auteur } from './auteur/entities/auteur.entity';
import { Theme } from './theme/entities/theme.entity';
import { Demographic } from './demographic/entities/demographic.entity';
import { TomesModule } from './tomes/tomes.module';
import { Tome } from './tomes/entities/tome.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Manga, Genre, Auteur, Theme, Demographic, Tome],
      synchronize: true,
      logging: true,
    }),
    HttpModule,
    MangaModule,
    GenreModule,
    AuteurModule,
    ThemeModule,
    DemographicModule,
    TomesModule,
  ],
  providers: [JikanService],
})
export class AppModule {}
