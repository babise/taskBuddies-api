import { Module } from '@nestjs/common';
import { TaskUserCommentService } from './task_user_comment.service';
import { TaskUserCommentController } from './task_user_comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskUserCommentEntity } from './entities/task_user_comment.entity';

@Module({
  controllers: [TaskUserCommentController],
  providers: [TaskUserCommentService],
  imports: [TypeOrmModule.forFeature([TaskUserCommentEntity])],
})
export class TaskUserCommentModule {}
