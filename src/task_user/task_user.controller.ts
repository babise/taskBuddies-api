import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskUserService } from './task_user.service';
import { TaskUserEntity } from './entities/task_user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-passport.guard';
import { User } from '../config/decorators/user.decorator';

@Controller('task-user')
@UseGuards(JwtAuthGuard)
export class TaskUserController {
  constructor(private readonly taskUserService: TaskUserService) {}

  @Post()
  create(@Body() taskUser: Partial<TaskUserEntity>, @User() user: any) {
    return this.taskUserService.create(taskUser, user);
  }

  @Get()
  findAll() {
    return this.taskUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskUserService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() taskUser: Partial<TaskUserEntity>) {
    return this.taskUserService.update(id, taskUser);
  }

  @Delete(':id')
  softDelete(@Param('id') id: number) {
    return this.taskUserService.softDelete(id);
  }
}
