import { Injectable } from '@nestjs/common';
import { CreateTaskUserCommentDto } from './dto/create-task_user_comment.dto';
import { UpdateTaskUserCommentDto } from './dto/update-task_user_comment.dto';

@Injectable()
export class TaskUserCommentService {
  create(createTaskUserCommentDto: CreateTaskUserCommentDto) {
    return 'This action adds a new taskUserComment';
  }

  findAll() {
    return `This action returns all taskUserComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskUserComment`;
  }

  update(id: number, updateTaskUserCommentDto: UpdateTaskUserCommentDto) {
    return `This action updates a #${id} taskUserComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskUserComment`;
  }
}
