import { Module } from '@nestjs/common';
import { GoalValidationService } from './goal-validation.service';
import { GoalValidationController } from './goal-validation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalValidationEntity } from './entities/goal-validation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoalValidationEntity])],
  controllers: [GoalValidationController],
  providers: [GoalValidationService],
})
export class GoalValidationModule {}
