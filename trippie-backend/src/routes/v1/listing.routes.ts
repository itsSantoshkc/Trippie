import { ListingService } from "./../../services/listingService";
import * as express from "express";
import z from "zod";
import fileUpload = require("express-fileupload");

const router = express.Router();

const listingSchema = z.object({
  listingId: z.string().default(" "),
  name: z.string(),
  location: z.string(),
  rating: z.number().default(0),
  type: z.enum(["restaurant", "hotel", "activities"]),
  ownerID: z.string(),
  images: z.any(),
  thumbnail: z.any(),
});

type listingType = z.infer<typeof listingSchema>;

router.get("/", async (req, res) => {
  const listingService = new ListingService();

  const listingsData = await listingService.getAllListing();
  res.status(200);
  res.json(listingsData);
});

router.post("/newlisting", fileUpload(), async (req, res) => {
  const thumbnail = req.files?.thumbnail as unknown as File;
  const images = req.files?.image as unknown as File;
  try {
    const validateListingData = listingSchema.parse({
      ...req.body,
      images,
      thumbnail,
    });

    const listingService = new ListingService();

    const newListingData = await listingService.newListing(validateListingData);

    res.status(200);
    res.json(newListingData);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const listingId = z.string().parse(req.params.id);
  const listingService = new ListingService();

  const listingData = await listingService.getListingById(listingId);
  if (listingData) {
    res.json(listingData);
  }
  res.status(401);
  res.json({ message: "Listing with this id doesn't exist" });
});

export default router;
