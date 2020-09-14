import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  BeforeInsert,
  Index,
} from 'typeorm';
import { User } from './User';
import { v4 as uuidv4 } from 'uuid';
import { enum_ShowTimeQualifierTEST } from './Enum';

export enum enum_ShowTimeQualifier {
  EARLY_SHOW = 'early',
  MATINEE = 'matinee',
  LATE_SHOW = 'late show',
  CANCELLED = 'cancelled',
  RESCHEDULED = 'rescheduled',
  POSTPONED = 'postponed',
}

// TODO create a unique index
// should be unique on venue, date (calculated by day time and possible other qualifier)
// and performers
// @Index([,])

@ObjectType()
@Entity()
export class Show extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  @Index({ unique: true })
  idx: string;

  @BeforeInsert()
  async generateUuid(): Promise<void> {
    this.idx = await uuidv4();
  }

  // TODO dates
  // timestampz with date and time of show
  // if no specific time - allow things such as 'early', 'late', 'matinee'
  // TODO create a calculated field with day, time or
  @Field(() => String)
  @Column({ type: 'date' })
  dateOfShow: Date;

  @Field()
  @Column({
    nullable: true,
    type: 'enum',
    enum: enum_ShowTimeQualifier,
  })
  showTimeQualifier: enum_ShowTimeQualifier;

  @Field()
  @Column({
    nullable: true,
    type: 'enum',
    enum: enum_ShowTimeQualifierTEST,
  })
  showTimeQualifierT: enum_ShowTimeQualifierTEST;

  @Field()
  @Column()
  performers!: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
