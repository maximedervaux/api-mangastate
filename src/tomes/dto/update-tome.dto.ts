import { PartialType } from '@nestjs/swagger';
import { CreateTomeDto } from './create-tome.dto';

export class UpdateTomeDto extends PartialType(CreateTomeDto) {}
