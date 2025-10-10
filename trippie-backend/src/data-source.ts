import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { UserVerification } from "./entity/UserVerification";
import { Listing, ListingImage } from "./entity/Listing";
import { Booking } from "./entity/Booking";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "trippie",
  synchronize: true,
  logging: false,
  entities: [User, UserVerification, Listing, ListingImage, Booking],
  migrations: [],
  subscribers: [],
});
