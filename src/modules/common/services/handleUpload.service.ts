import { Bucket } from "@google-cloud/storage";
import { FileUpload } from "../entities/common.entity";

export async function uploadFile(image: Promise<FileUpload>, bucket: Bucket)
    : Promise<string> {
    const { filename, createReadStream } = await image;
    await new Promise(async (resolve, reject) => {
        createReadStream()
            .pipe(
                bucket.file(filename).createWriteStream({
                    resumable: false,
                    gzip: true
                })
            )
            .on("finish", resolve)
            .on("error", reject)
    })
    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}
