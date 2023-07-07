import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-passport.guard';
import { User } from '../config/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@User() user: any, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto, user);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.taskService.findAll(user);
  }

  @Get('date')
  findOnDate(@Query('date') date: string, @User() user: UserEntity) {
    const taskDate = date ? new Date(date) : new Date();
    return this.taskService.getTaskOnDate(taskDate, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
