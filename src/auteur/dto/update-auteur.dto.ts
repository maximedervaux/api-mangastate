import { PartialType } from '@nestjs/swagger';
import { CreateAuteurDto } from './create-auteur.dto';

export class UpdateAuteurDto extends PartialType(CreateAuteurDto) {}
