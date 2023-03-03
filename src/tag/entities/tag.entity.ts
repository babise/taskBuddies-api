import { Timestamp } from 'src/Generic/timestamp.entity';
import { GoalEntity } from 'src/goal/entities/goal.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class TagEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => GoalEntity, (goal) => goal.tags)
  goals: GoalEntity[];
}
