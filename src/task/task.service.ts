import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll() {
    return this.taskRepository.find({ where: { deletedAt: IsNull() } });
  }

  async findOne(id: number) {
    return this.taskRepository.findBy({ id });
  }

  async update(id: number, updateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    await this.taskRepository.softDelete(id);
  }

  async getTaskOnDate(date: Date = new Date()) {
    const tasks = await this.taskRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['recurrences'],
    });

    const tasksOnDate = tasks.filter((task) => {
      return task.recurrences.some((recurrence) => {
        const taskStartDate = recurrence.start_date || task.createdAt;
        const taskEndDate = recurrence.end_date || new Date();

        if (recurrence.date) {
          return recurrence.date.toDateString() === date.toDateString();
        }

        if (recurrence.day_of_week) {
          return date.getDay() === recurrence.day_of_week;
        }

        if (recurrence.recurrence_interval) {
          const daysDifference = Math.floor(
            (date.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          return daysDifference % recurrence.recurrence_interval === 0;
        }

        if (taskStartDate <= date && taskEndDate >= date) {
          return true;
        }

        return false;
      });
    });

    return tasksOnDate;
  }
}
