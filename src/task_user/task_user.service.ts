import { Injectable } from '@nestjs/common';
import { CreateTaskUserDto } from './dto/create-task_user.dto';
import { UpdateTaskUserDto } from './dto/update-task_user.dto';

@Injectable()
export class TaskUserService {
  create(createTaskUserDto: CreateTaskUserDto) {
    return 'This action adds a new taskUser';
  }

  findAll() {
    return `This action returns all taskUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskUser`;
  }

  update(id: number, updateTaskUserDto: UpdateTaskUserDto) {
    return `This action updates a #${id} taskUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskUser`;
  }
}
