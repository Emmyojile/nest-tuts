import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserRoleType = 'ADMIN' | 'INTERN' | 'ENGINEER';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: ['INTERN', 'ENGINEER', 'ADMIN'],
    default: 'INTERN',
  })
  role: UserRoleType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
