import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// Adjust the path as per your project structure

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  archived: boolean;

  @Column('simple-array')
  tags: string[]; // Changed to array of strings

  @ManyToOne(() => User, user => user.notes)
  user: User;
}
