import { GroupEntity } from '../../group/entities/group.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { TagEntity } from '../../tag/entities/tag.entity';

import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../config/enum/roles.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  profile_picture: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    nullable: false,
  })
  roles: Role;

  @OneToMany(() => TaskEntity, (task) => task.author)
  tasks: TaskEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.createdBy)
  createdTags: TagEntity[];

  @ManyToMany(() => GroupEntity, (group) => group.users, { cascade: true })
  groups: GroupEntity[];
}
