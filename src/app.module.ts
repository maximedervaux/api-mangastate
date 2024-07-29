import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaModule } from './manga/manga.module';
import { Manga } from './manga/entities/manga.entity';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/entities/genre.entity';
import { JikanService } from './jikan/jikan.service';
import { HttpModule } from '@nestjs/axios';
import { AuteurModule } from './auteur/auteur.module';
import { ThemeModule } from './theme/theme.module';
import { DemographicModule } from './demographic/demographic.module';
import { Auteur } from './auteur/entities/auteur.entity';
import { Theme } from './theme/entities/theme.entity';
import { Demographic } from './demographic/entities/demographic.entity';
import { ConfigModule } from '@nestjs/config';
import { TomesModule } from './tomes/tomes.module';
import { Tome } from './tomes/entities/tome.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'test',
      database: 'mangastate',
      entities: [Manga,Genre,Auteur,Theme,Demographic,Tome],
      synchronize: true,
      logging:true
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