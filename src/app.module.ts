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
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

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
      entities: [Manga, Genre, Auteur, Theme, Demographic, Tome,User],
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
    AuthModule,
    UsersModule,
  ],
  providers: [JikanService],
})
export class AppModule {}
