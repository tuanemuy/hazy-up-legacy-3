import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

type Props = {
  params: {
    filePath: string[];
  };
};

export async function GET(_request: Request, { params: { filePath } }: Props) {
  const key = filePath.join("/");
  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: key,
  });

  try {
    const response = await s3.send(command);
    return new Response(response.Body?.transformToWebStream(), {
      headers:
        response.ContentType && response.ContentLength
          ? {
              "content-type": response.ContentType,
              "content-length": response.ContentLength.toString(),
            }
          : undefined,
    });
  } catch (err) {
    console.error(err);
    return new Response(null, { status: 404 });
  }
}
