import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Manga } from 'src/manga/entities/manga.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Manga])],
  providers: [UsersService,],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
