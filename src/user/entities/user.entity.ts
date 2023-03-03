import { GoalValidationEntity } from 'src/goal-validation/entities/goal-validation.entity';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    // select: false,
  })
  password: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column({
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @OneToMany(() => GoalEntity, (goal) => goal.author)
  goals: GoalEntity[];

  @OneToMany(
    () => GoalValidationEntity,
    (goal_validation) => goal_validation.user,
  )
  validations: GoalValidationEntity[];
}
