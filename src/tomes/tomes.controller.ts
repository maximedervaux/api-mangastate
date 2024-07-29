import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TomesService } from './tomes.service';
import { CreateTomeDto } from './dto/create-tome.dto';
import { UpdateTomeDto } from './dto/update-tome.dto';
import { ApiTags } from '@nestjs/swagger';



@Controller('tomes')
@ApiTags('Tomes')
export class TomesController {
  constructor(private readonly tomesService: TomesService) {}

  @Post()
  create(@Body() createTomeDto: CreateTomeDto) {
    return this.tomesService.create(createTomeDto);
  }

  @Get()
  findAll() {
    return this.tomesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tomesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTomeDto: UpdateTomeDto) {
    return this.tomesService.update(+id, updateTomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tomesService.remove(+id);
  }
}
