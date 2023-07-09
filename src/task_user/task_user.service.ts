// task-user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { TaskUserEntity } from './entities/task_user.entity';

@Injectable()
export class TaskUserService {
  constructor(
    @InjectRepository(TaskUserEntity)
    private taskUserRepository: Repository<TaskUserEntity>,
  ) {}

  async create(taskUser: Partial<TaskUserEntity>, user: any) {
    const taskId = taskUser.task.id;
    const userId = user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Définit l'heure à 00:00:00 pour la comparaison

    const existingTaskUser = await this.taskUserRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        doneAt: MoreThan(today), // Vérifie si un enregistrement existe déjà pour la tâche et l'utilisateur aujourd'hui
      },
    });

    if (existingTaskUser) {
      throw new Error('Task already validated today');
    }

    taskUser.doneAt = new Date();
    taskUser.user = user;

    const newTaskUser = this.taskUserRepository.create(taskUser);
    return this.taskUserRepository.save(newTaskUser);
  }

  async findAll() {
    return this.taskUserRepository.find({ relations: ['task'] });
  }

  async findOne(id: number) {
    return this.taskUserRepository.findBy({ id });
  }

  async update(id: number, taskUser: Partial<TaskUserEntity>) {
    await this.taskUserRepository.update(id, taskUser);
    return this.findOne(id);
  }

  async deleteByTaskAndUser(taskId: number, userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Définit l'heure à 00:00:00 pour la comparaison

    const taskUser = await this.taskUserRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        doneAt: MoreThan(today), // Vérifie que la tâche a été validée aujourd'hui
      },
    });

    if (taskUser) {
      return this.taskUserRepository.softDelete(taskUser.id);
    }
  }

  async hasTaskBeenValidatedToday(taskId: number): Promise<boolean> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Définit l'heure à 00:00:00 pour la comparaison

    const taskUser = await this.taskUserRepository.findOne({
      where: {
        task: { id: taskId },
        doneAt: MoreThan(today), // Vérifie que la tâche a été validée aujourd'hui
      },
    });

    return !!taskUser; // Renvoie true si la tâche a été validée aujourd'hui, sinon false
  }
}
