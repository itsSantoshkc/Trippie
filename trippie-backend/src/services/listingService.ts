import { ListingImage } from "./../entity/Listing";
import { UploadedFile } from "express-fileupload";
import { AppDataSource } from "../data-source";
import { Listing } from "../entity/Listing";
import { createNewFile } from "../utils/fileUpload";

type listingType = Omit<Listing, "listingId"> & {
  images: UploadedFile[];
  thumbnail: UploadedFile;
};

export class ListingService {
  async newListing({
    name,
    rating = 0,
    type,
    ownerID,
    location,
    images,
    thumbnail,
  }: listingType) {
    const newListing = new Listing();
    const listingImage: ListingImage[] = [
      new ListingImage(),
      new ListingImage(),
      new ListingImage(),
      new ListingImage(),
      new ListingImage(),
      new ListingImage(),
    ];

    newListing.name = name;
    newListing.ownerID = ownerID;
    newListing.type = type;
    newListing.location = location;
    newListing.rating = rating;

    const thumbnailPath = await createNewFile(thumbnail);
    const imagesPathPromise = images.map((image) => {
      const imagePath = createNewFile(image);
      if (imagePath !== null) {
        return imagePath;
      }
    });

    const imagesPath = await Promise.all(imagesPathPromise).then((data) => {
      return data;
    });
    imagesPath.push(thumbnailPath);

    const listingRepository = AppDataSource.getRepository(Listing);
    const listingDetails = await listingRepository.save(newListing);

    imagesPath.forEach((image, idx) => {
      listingImage[idx].listingID = listingDetails.listingId;
      listingImage[idx].imageUrl = image;
      listingImage[idx].listingImageIndex = idx;
      listingImage[idx].thumbnail = image === thumbnailPath ? true : false;
    });

    const listingImageRepository = AppDataSource.getRepository(ListingImage);
    listingImageRepository.insert(listingImage);
  }

  async getAllListing() {
    const listingRepository = AppDataSource.getRepository(Listing);
    return await listingRepository.find();
  }

  async getListingById(listingId: string) {
    const listingRepository = AppDataSource.getRepository(Listing);
    const listing = await listingRepository.findOne({
      where: { listingId: listingId },
    });

    return listing;
  }
}
