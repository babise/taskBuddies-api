import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalEntity } from './entities/goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(GoalEntity)
    private readonly goalRepository: Repository<GoalEntity>,
  ) {}

  async create(createGoalDto: CreateGoalDto) {
    try {
      const goal = await this.goalRepository.save(createGoalDto);
      return goal;
    } catch (error) {
      throw new Error('Error creating goal');
    }
  }

  async findAll(queries) {
    let { page, search, tags, week, month } = queries;
    tags = tags ? tags.split(',') : [];
    week = week ? week : false;

    try {
      const now = new Date();
      const dayOfWeek = now.getDay(); // Renvoie un nombre entre 0 et 6 (0 = dimanche, 1 = lundi, etc.)
      console.log('dayOfWeek', dayOfWeek);

      const query = await this.goalRepository
        .createQueryBuilder('goal')
        .leftJoinAndSelect('goal.tags', 'tags')
        .orderBy('goal.createdAt', 'DESC');
      // Ajouter la condition pour le jour de la semaine actuel
      switch (dayOfWeek) {
        case 0:
          query.andWhere('goal.dimanche = true');
          break;
        case 1:
          query.andWhere('goal.lundi = true');
          break;
        case 2:
          query.andWhere('goal.mardi = true');
          break;
        case 3:
          query.andWhere('goal.mercredi = true');
          break;
        case 4:
          query.andWhere('goal.jeudi = true');
          break;
        case 5:
          query.andWhere('goal.vendredi = true');
          break;
        case 6:
          query.andWhere('goal.samedi = true');
          break;
      }

      if (tags.length > 0) {
        query.andWhere('tags.name IN (:...tags)', { tags });
      }

      const goalList = query.getMany();

      console.log('goalList', goalList);

      return goalList;
    } catch (error) {
      throw new Error('Error finding goals');
    }
  }

  findOne(id: number) {
    try {
      const goal = this.goalRepository.findOneBy({ id });
      return goal;
    } catch (error) {
      throw new Error('Error finding goal');
    }
  }

  update(id: number, updateGoalDto: UpdateGoalDto) {
    try {
      const goal = this.goalRepository.update(id, updateGoalDto);
      return goal;
    } catch (error) {
      throw new Error('Error updating goal');
    }
  }

  softDelete(id: number) {
    try {
      const goal = this.goalRepository.softRemove({ id });
      return goal;
    } catch (error) {
      throw new Error('Error deleting goal');
    }
  }
}
