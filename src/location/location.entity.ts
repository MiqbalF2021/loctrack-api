import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  store?: string;

  // @ManyToOne(() => User, { eager: false })
  // user: User;

  // @Column()
  // userId: number;
}
