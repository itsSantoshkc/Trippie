import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  userID: null | string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  phone: string;

  @Column({ default: "user" })
  role: string;

  @Column({ unique: true })
  email: string;
}
