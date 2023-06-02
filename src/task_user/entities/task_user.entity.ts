import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { TaskEntity } from 'src/task/entities/task.entity';
import { TaskUserCommentEntity } from 'src/task_user_comment/entities/task_user_comment.entity';

@Entity('task_user')
export class TaskUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doneAt: Date;

  @ManyToOne(() => TaskEntity, (task) => task.id, { onDelete: 'CASCADE' })
  task: TaskEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => TaskUserCommentEntity, (comment) => comment.task_user, {
    cascade: true,
  })
  comments: TaskUserCommentEntity[];
}
