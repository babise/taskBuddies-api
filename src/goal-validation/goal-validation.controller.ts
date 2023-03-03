import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GoalValidationService } from './goal-validation.service';
import { CreateGoalValidationDto } from './dto/create-goal-validation.dto';
import { UpdateGoalValidationDto } from './dto/update-goal-validation.dto';

@Controller('validations')
export class GoalValidationController {
  constructor(private readonly goalValidationService: GoalValidationService) {}

  @Post()
  create(@Body() createGoalValidationDto: CreateGoalValidationDto) {
    return this.goalValidationService.create(createGoalValidationDto);
  }

  @Get()
  findAll(@Query() queries: any) {
    return this.goalValidationService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalValidationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoalValidationDto: UpdateGoalValidationDto,
  ) {
    return this.goalValidationService.update(+id, updateGoalValidationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalValidationService.remove(+id);
  }
}
