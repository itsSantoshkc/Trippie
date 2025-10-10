import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs/promises";
import * as path from "path";

const UPLOAD_DIR = path.resolve("src", "public", "listing");

export const createNewFile = async (
  file: UploadedFile
): Promise<string | null> => {
  try {
    if (!file) {
      console.log("No file provided");
      return null;
    }

    const imageName = randomUUID();

    let fileExtension = "";
    if (file.name) {
      fileExtension = path.extname(file.name);
    } else if (file.mimetype) {
      const mimeToExt: { [key: string]: string } = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/gif": ".gif",
        "image/webp": ".webp",
      };
      fileExtension = mimeToExt[file.mimetype] || "";
    }

    const fileName = `${imageName}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    try {
      await fs.access(UPLOAD_DIR);
    } catch {
      console.log("Creating upload directory...");
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }
    let fileData: Buffer = file.data;

    await fs.writeFile(filePath, fileData);
    return filePath;
  } catch (error) {
    console.error("Error creating file:", error);
    return null;
  }
};

export const getFileInfo = async (
  fileName: string
): Promise<{ exists: boolean; size?: number; path?: string }> => {
  try {
    const filePath = path.join(UPLOAD_DIR, fileName);
    const stats = await fs.stat(filePath);
    return {
      exists: true,
      size: stats.size,
      path: filePath,
    };
  } catch (error) {
    return { exists: false };
  }
};

export const deleteFile = async (fileName: string): Promise<boolean> => {
  try {
    const filePath = path.join(UPLOAD_DIR, fileName);
    await fs.unlink(filePath);
    console.log(`File deleted: ${fileName}`);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};
