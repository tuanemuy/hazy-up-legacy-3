"use server";

import sharp from "sharp";
import mime from "mime";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { prisma } from "db";
import { ActionError } from "../error";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export type UploadFileOptions = {
  name: string;
  body: Uint8Array;
  mimeType: string;
  userId?: string;
  width: number;
};

export async function uploadFile({
  name,
  body,
  mimeType,
  userId,
  width,
}: UploadFileOptions) {
  let converted;
  try {
    converted = await sharp(Buffer.from(body))
      .resize({
        width,
        withoutEnlargement: true,
      })
      .webp()
      .toBuffer();
  } catch (e) {
    console.error(e);
    return { file: null, error: ActionError.ImageConversionError };
  }

  const ext = mime.getExtension(mimeType);
  const key = `${userId ? `${userId}/` : ""}${name}.${ext}`;
  const convertedKey = `${userId ? `${userId}/` : ""}${name}.webp`;
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: key,
    Body: body,
    ContentLength: body.length,
  });
  const convertedCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: convertedKey,
    Body: converted,
    ContentLength: converted.length,
  });

  try {
    await Promise.all([s3.send(command), s3.send(convertedCommand)]);
  } catch (e) {
    console.error(e);
    return { file: null, error: ActionError.S3Error };
  }

  try {
    const file = await prisma.file.create({
      data: {
        userId,
        path: key,
        mimeType,
        assets: {
          create: [
            {
              label: `webp@${width}`,
              path: convertedKey,
              mimeType: "image/webp",
              width,
            },
          ],
        },
      },
    });

    return { file, error: null };
  } catch (e) {
    console.error(e);
    return { file: null, error: ActionError.DatabaseError };
  }
}

export async function deleteFile(path: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: path,
  });

  try {
    await s3.send(command);
    await prisma.file.delete({
      where: {
        path,
      },
    });
    return { path, error: null };
  } catch (e) {
    console.error(e);
    return { path: null, error: ActionError.S3Error };
  }
}
