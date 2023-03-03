import { Timestamp } from 'src/Generic/timestamp.entity';
import { GoalValidationEntity } from 'src/goal-validation/entities/goal-validation.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('goal')
export class GoalEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isDone: boolean;

  @Column({ default: false })
  lundi: boolean;

  @Column({ default: false })
  mardi: boolean;

  @Column({ default: false })
  mercredi: boolean;

  @Column({ default: false })
  jeudi: boolean;

  @Column({ default: false })
  vendredi: boolean;

  @Column({ default: false })
  samedi: boolean;

  @Column({ default: false })
  dimanche: boolean;

  @ManyToMany(() => TagEntity, (tag) => tag.goals, { cascade: true })
  @JoinTable()
  tags: TagEntity[];

  @OneToMany(
    () => GoalValidationEntity,
    (goalValidation) => goalValidation.goals,
  )
  validation: GoalValidationEntity;

  @ManyToOne(() => UserEntity, (user) => user.goals)
  author: UserEntity;
}
