import { cloudinary_config } from "../../config/cloudinary.config";
import { FileUpload } from "../entities/common.entity";

export async function uploadFile(image: Promise<FileUpload>, folder: string)
    : Promise<{url: string}> {
    const { filename, createReadStream } = await image;
    
    return await new Promise(async (resolve, reject) => {
        const upload_stream = cloudinary_config.uploader.upload_stream({
            folder
        }, (err, result) => {
            if(result) {
                resolve({
                    url: result.url
                })
            } else {
                reject(err.message)
            }
        })
    createReadStream()
        .pipe(upload_stream)
    })
}

export async function uploadFileSync(image: FileUpload, folder: string)
    : Promise<{url: string}> {
    const { filename, createReadStream } = await image;
    
    return await new Promise(async (resolve, reject) => {
        const upload_stream = cloudinary_config.uploader.upload_stream({
            folder
        }, (err, result) => {
            if(result) {
                resolve({
                    url: result.url
                })
            } else {
                reject(err.message)
            }
        })
    createReadStream()
        .pipe(upload_stream)
    })
}

