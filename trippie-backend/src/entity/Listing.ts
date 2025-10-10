import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Listing {
  @PrimaryGeneratedColumn("uuid")
  listingId: string;

  @Column()
  name: string;
  @Column()
  location: string;
  @Column()
  rating: number;

  @Column()
  type: "restaurant" | "hotel" | "activities";

  @ManyToOne(() => User, (user) => user.userID, { cascade: true })
  @JoinColumn({ name: "ownerID" })
  ownerID: string;
}

@Entity()
export class ListingImage {
  @PrimaryColumn()
  listingImageIndex: number;

  @Column()
  imageUrl: string;

  @Column()
  thumbnail: boolean;

  @PrimaryColumn()
  @OneToMany(() => Listing, (listing) => listing.listingId, { cascade: true })
  @JoinColumn({ name: "listingId" })
  listingID: string;
}
