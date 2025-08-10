import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "./s3Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Function to list all buckets
export async function listBuckets() {
  try {
    const response = await s3.send(new ListBucketsCommand({}));
    return { status: 200, buckets: response.Buckets || [] };
  } catch (error) {
    return { status: 500, error: "Failed to list buckets" };
  }
}

// Function to create a new bucket
export async function createBucket(bucketName: string) {
  try {
    const response = await s3.send(
      new CreateBucketCommand({ Bucket: bucketName })
    );
    return response;
  } catch (error: any) {
    if (error.Code === "BucketAlreadyExists") {
      return { status: 409, error: "Bucket already exists" };
    }
    if (error.Code === "BucketAlreadyOwnedByYou") {
      return { status: 409, error: "Bucket already owned by you" };
    }
    return { status: 500, error: "Failed to create bucket" };
  }
}

// Function to delete a bucket
export async function deleteBucket(bucketName: string) {
  try {
    // Note: AWS S3 does not allow deleting a bucket that contains objects.
    // You must first delete all objects in the bucket before deleting the bucket itself.
    await s3.send(new DeleteBucketCommand({ Bucket: bucketName }));
    return { status: 200, message: "Bucket deleted successfully" };
  } catch (error: any) {
    if (error.Code === "NoSuchBucket") {
      return { status: 404, error: "Bucket does not exist" };
    }
    return { status: 500, error: error.message };
  }
}

// Function to add a file to a bucket
export async function getPresignedUrltoUpload(
  bucketName: string,
  fileName: string
) {
  try {
    const url = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      }),
      { expiresIn: 3600 }
    );
    return { status: 200, url };
  } catch (error: any) {
    if (error.Code === "NoSuchBucket") {
      return { status: 404, error: "Bucket does not exist" };
    }
    return { status: 500, error: "Failed to generate signed url" };
  }
}

// Function to list objects in a bucket
export async function listObjectsInBucket(bucketName: string, prefix: string) {
  try {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Delimiter: "/",
        Prefix: prefix,
      })
    );
    return { status: 200, objects: response || [] };
  } catch (error: any) {
    if (error.Code === "NoSuchBucket") {
      return { status: 404, error: "Bucket does not exist" };
    }
    return { status: 500, error: "Failed to list objects in bucket" };
  }
}

// Function to delete object in a bucket
export async function deleteObjectInBucket(
  bucketName: string,
  fileName: string
) {
  try {
    await s3.send(
      new DeleteObjectCommand({ Bucket: bucketName, Key: fileName })
    );
    return { status: 200, message: "Object deleted successfully" };
  } catch (error: any) {
    if (error.Code === "NoSuchBucket") {
      return { status: 404, error: "Bucket does not exist" };
    }
    if (error.Code === "NoSuchKey") {
      return { status: 404, error: "Object does not exist" };
    }
    return { status: 500, error: "Failed to delete object" };
  }
}
