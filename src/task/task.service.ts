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
    return this.taskRepository.find({
      relations: ['recurrences'],
    });
  }

  async findOne(id: number) {
    return this.taskRepository.find({
      where: { id },
      relations: ['recurrences'],
    });
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
        const taskEndDate = recurrence.end_date || null;
        const interval = recurrence.recurrence_interval || null;
        const dayOfWeek = recurrence.day_of_week || null;
        const dayOfMonth = recurrence.day_of_month || null;

        // Check for single occurrence task
        if (!taskEndDate && !interval && !dayOfWeek && !dayOfMonth) {
          return taskStartDate.toDateString() === date.toDateString();
        }

        // Check for weekly recurrence
        if (dayOfWeek) {
          return date.getDay() === dayOfWeek;
        }

        // Check for monthly recurrence
        if (dayOfMonth) {
          return date.getDate() === dayOfMonth;
        }

        // Check for recurrence with interval
        if (interval) {
          const daysDifference = Math.floor(
            (date.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          return daysDifference % interval === 0;
        }

        // Check for recurrence within start and end date
        if (taskStartDate <= date && (!taskEndDate || taskEndDate >= date)) {
          return true;
        }

        return false;
      });
    });

    return tasksOnDate;
  }
}
