import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemographicService } from './demographic.service';
import { CreateDemographicDto } from './dto/create-demographic.dto';
import { UpdateDemographicDto } from './dto/update-demographic.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('demographic')
@ApiTags('Demographic')
export class DemographicController {
  constructor(private readonly demographicService: DemographicService) {}

  @Post()
  create(@Body() createDemographicDto: CreateDemographicDto) {
    return this.demographicService.create(createDemographicDto);
  }

  @Get()
  findAll() {
    return this.demographicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demographicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemographicDto: UpdateDemographicDto) {
    return this.demographicService.update(+id, updateDemographicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demographicService.remove(+id);
  }
}
