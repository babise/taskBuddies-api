import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async create(createTaskDto, user: UserEntity) {
    const task = new TaskEntity();
    Object.assign(task, createTaskDto);
    task.author = user;

    try {
      const savedTask = await this.taskRepository.save(task);
      console.log('Task saved successfully:', savedTask);
      return savedTask;
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    }
  }

  async findAll(user: UserEntity) {
    return this.taskRepository.find({
      //rel reccurrences et taskUsers
      relations: ['recurrences', 'author', 'taskUsers', 'tags'],
      where: { author: { id: user.id } },
    });
  }

  async findOne(id: number) {
    return this.taskRepository.find({
      where: { id },
      relations: ['recurrences', 'author', 'taskUsers'],
    });
  }

  async update(id: number, updateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    await this.taskRepository.softDelete(id);
  }

  async getTaskOnDate(date: Date = new Date(), user: UserEntity) {
    const tasks = await this.taskRepository.find({
      where: { deletedAt: IsNull(), author: { id: user.id } },
      relations: ['recurrences', 'author', 'taskUsers'],
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
