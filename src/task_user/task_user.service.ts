// task-user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskUserEntity } from './entities/task_user.entity';

@Injectable()
export class TaskUserService {
  constructor(
    @InjectRepository(TaskUserEntity)
    private taskUserRepository: Repository<TaskUserEntity>,
  ) {}

  async create(taskUser: Partial<TaskUserEntity>, user: any) {
    taskUser.doneAt = new Date();
    taskUser.user = user; // Associez l'utilisateur à taskUser ici si c'est ce que vous voulez faire

    const newTaskUser = this.taskUserRepository.create(taskUser);
    return this.taskUserRepository.save(newTaskUser);
  }

  async findAll() {
    return this.taskUserRepository.find();
  }

  async findOne(id: number) {
    return this.taskUserRepository.findBy({ id });
  }

  async update(id: number, taskUser: Partial<TaskUserEntity>) {
    await this.taskUserRepository.update(id, taskUser);
    return this.findOne(id);
  }

  async softDelete(id: number) {
    return this.taskUserRepository.softDelete(id);
  }
}
