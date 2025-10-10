import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Listing } from "./Listing";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  bookingId: string;

  @Column()
  status: "reservation" | "paid";

  @Column()
  startingFrom: Date;

  @Column({ default: 1 })
  noOfPerson: Number;
  @Column()
  endAt: Date;

  @ManyToOne(() => User, (user) => user.userID, { cascade: true })
  @JoinColumn({ name: "bookedBy" })
  user: User;

  @ManyToOne(() => Listing, (listing) => listing.listingId, { cascade: true })
  @JoinColumn({ name: "listingId" })
  listing: Listing;
}
