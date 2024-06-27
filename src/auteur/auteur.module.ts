import { Module } from '@nestjs/common';
import { AuteurService } from './auteur.service';
import { AuteurController } from './auteur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auteur } from './entities/auteur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auteur])],
  controllers: [AuteurController],
  providers: [AuteurService],
  exports: [TypeOrmModule]
})
export class AuteurModule {}
