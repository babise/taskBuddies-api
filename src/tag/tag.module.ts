import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { TaskEntity } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, TaskEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
