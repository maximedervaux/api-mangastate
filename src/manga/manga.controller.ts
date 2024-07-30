import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Query } from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { Manga } from './entities/manga.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';

@Controller('manga')
@ApiTags('Manga')
export class MangaController {
  private logger = new Logger('MangaController')
  constructor(private readonly mangaService: MangaService) {}

  @Post()
  create(@Body() createMangaDto: CreateMangaDto) {
    return this.mangaService.create(createMangaDto);
  }

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<Pagination<Manga>> {
    limit = limit > 100 ? 100 : limit;
    return this.mangaService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(+id);
  }

  @Get('title/:title')
  async findByTitle(@Param('title') title: string , @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    this.logger.verbose('Titre recherche : '+title)
    let resultat = await this.mangaService.findByTitle(title,{page,limit})
    return resultat
  }

  @Get('jikan/:title')
  async getNewManga(@Param('title') title: string ){
    let resultat = await this.mangaService.findByTitleExtra(title);
    return resultat
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.update(+id, updateMangaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mangaService.remove(+id);
  }
}
