import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class UserVerification {
  @PrimaryColumn()
  userId: string;

  @Column()
  verified: boolean;

  @Column()
  verificationToken: number;

  @Column({
    nullable: true,
  })
  verfiedAt: Date;

  @OneToOne(() => User, (user) => user.userID, {
    cascade: true,
  })
  @JoinColumn({ name: "userId" })
  user: User;
}
