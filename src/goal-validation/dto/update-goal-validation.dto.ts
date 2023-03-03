import { PartialType } from '@nestjs/mapped-types';
import { CreateGoalValidationDto } from './create-goal-validation.dto';

export class UpdateGoalValidationDto extends PartialType(CreateGoalValidationDto) {}
