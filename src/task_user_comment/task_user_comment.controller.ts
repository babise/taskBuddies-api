import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskUserCommentService } from './task_user_comment.service';
import { CreateTaskUserCommentDto } from './dto/create-task_user_comment.dto';
import { UpdateTaskUserCommentDto } from './dto/update-task_user_comment.dto';

@Controller('task-user-comment')
export class TaskUserCommentController {
  constructor(private readonly taskUserCommentService: TaskUserCommentService) {}

  @Post()
  create(@Body() createTaskUserCommentDto: CreateTaskUserCommentDto) {
    return this.taskUserCommentService.create(createTaskUserCommentDto);
  }

  @Get()
  findAll() {
    return this.taskUserCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskUserCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskUserCommentDto: UpdateTaskUserCommentDto) {
    return this.taskUserCommentService.update(+id, updateTaskUserCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskUserCommentService.remove(+id);
  }
}
