import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskUserService } from './task_user.service';
import { CreateTaskUserDto } from './dto/create-task_user.dto';
import { UpdateTaskUserDto } from './dto/update-task_user.dto';

@Controller('task-user')
export class TaskUserController {
  constructor(private readonly taskUserService: TaskUserService) {}

  @Post()
  create(@Body() createTaskUserDto: CreateTaskUserDto) {
    return this.taskUserService.create(createTaskUserDto);
  }

  @Get()
  findAll() {
    return this.taskUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskUserDto: UpdateTaskUserDto) {
    return this.taskUserService.update(+id, updateTaskUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskUserService.remove(+id);
  }
}
