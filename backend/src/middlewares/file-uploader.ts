import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";
import s3Client from "../aws/aws";
import path from "path";
import config from "config";

declare global {
    namespace Express {
        interface Request {
            imageUrl?: string;
        }
    }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) return next();

    const postImage = req.files.imageFile as UploadedFile

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: config.get<string>('s3.bucket'),
            Key: `${v4()}${path.extname(postImage.name)}`,
            Body: postImage.data,
            ContentType: postImage.mimetype
        }
    })

    const response = await upload.done()

    req.imageUrl = `${response.Bucket}/${response.Key}`
    next();
}