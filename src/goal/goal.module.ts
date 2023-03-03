import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalEntity } from './entities/goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity])],
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
