import { PartialType } from '@nestjs/swagger';
import { CreateDemographicDto } from './create-demographic.dto';

export class UpdateDemographicDto extends PartialType(CreateDemographicDto) {}
