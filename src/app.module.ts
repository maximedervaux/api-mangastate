import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaModule } from './manga/manga.module';
import { Manga } from './manga/entities/manga.entity';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/entities/genre.entity';
import { JikanService } from './jikan/jikan.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb' ,
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'mangastate',
      entities: [Manga,Genre],
      synchronize: true,
    }),
    HttpModule,
    MangaModule,
    GenreModule,
  ],
  providers: [JikanService],
})
export class AppModule {}