import { Timestamp } from 'src/Generic/timestamp.entity';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('goal_validation')
export class GoalValidationEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GoalEntity, (goal) => goal.validation)
  goals: GoalEntity[];

  @ManyToOne(() => UserEntity, (user) => user.validations)
  user: UserEntity;
}
