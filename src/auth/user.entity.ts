import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', nullable: true }) // ✅ Permitir valores nulos
  resetToken?: string;

  @Column({ type: 'timestamp', nullable: true }) // ✅ Permitir valores nulos
  resetTokenExpiration?: Date;
}
