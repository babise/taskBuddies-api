import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoalValidationDto } from './dto/create-goal-validation.dto';
import { UpdateGoalValidationDto } from './dto/update-goal-validation.dto';
import { GoalValidationEntity } from './entities/goal-validation.entity';

@Injectable()
export class GoalValidationService {
  constructor(
    @InjectRepository(GoalValidationEntity)
    private readonly goalValidationRepository: Repository<GoalValidationEntity>,
  ) {}
  async create(createGoalValidationDto: CreateGoalValidationDto) {
    const goalValidation = await this.goalValidationRepository.create(
      createGoalValidationDto,
    );
    console.log('goalValidation', goalValidation);
    return await this.goalValidationRepository.save(goalValidation);
  }

  async findAll(queries) {
    let { tags } = queries;
    const query = await this.goalValidationRepository
      .createQueryBuilder('goal_validation')
      .leftJoinAndSelect('goal_validation.goals', 'goals')
      .leftJoinAndSelect('goals.tags', 'tags')
      .orderBy('goal_validation.createdAt', 'DESC');

    if (tags) {
      tags = tags.split(',');
      query.andWhere('tags.name IN (:...tags)', { tags });
    }

    try {
      const goalValidations = await query.getMany();
      return goalValidations;
    } catch (error) {
      throw new Error('Error fetching goalValidations');
    }
  }

  async findOne(id: number) {
    try {
      const goalValidation = await this.goalValidationRepository
        .createQueryBuilder('goal_validation')
        .leftJoinAndSelect('goal_validation.goals', 'goals')
        .leftJoinAndSelect('goals.tags', 'tags')
        .where('goal_validation.id = :id', { id })
        .getOne();
      return goalValidation;
    } catch (error) {
      throw new Error('Error fetching goalValidation');
    }
  }

  update(id: number, updateGoalValidationDto: UpdateGoalValidationDto) {
    return `This action updates a #${id} goalValidation`;
  }

  async remove(id: number) {
    try {
      const goalValidation = await this.goalValidationRepository.softRemove({
        id,
      });
      return goalValidation;
    } catch (error) {
      throw new Error('Error deleting goalValidation');
    }
  }
}
