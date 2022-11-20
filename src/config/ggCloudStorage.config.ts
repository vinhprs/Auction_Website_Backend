import { Storage } from "@google-cloud/storage";
import { join } from "path";
import { cwd } from "process";

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: JSON.parse(process.env.KEY_FILE_NAME)
});

storage.getBuckets().then(x => console.log(x));

export const ggStorageCatalog = storage.bucket(process.env.GG_BUCKET_CATALOG);
export const ggStorageProduct = storage.bucket(process.env.GG_BUCKET_PRODUCT);
export const ggStorageUser = storage.bucket(process.env.GG_BUCKET_USER);