import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaModule } from './manga/manga.module';
import { Manga } from './manga/entities/manga.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mangastate',
      entities: [Manga],
      synchronize: true,
    }),
    MangaModule,
  ],
})
export class AppModule {}