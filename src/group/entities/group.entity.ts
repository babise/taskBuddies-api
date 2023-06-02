import { TagEntity } from 'src/tag/entities/tag.entity';
import { TaskEntity } from 'src/task/entities/task.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity('group')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => TaskEntity, (task) => task.group)
  tasks: TaskEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.group)
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;
}
