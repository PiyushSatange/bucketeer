import {
  createBucket,
  deleteBucket,
  deleteObjectInBucket,
  listBuckets,
} from "@/lib/s3Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const buckets = await listBuckets();
  return NextResponse.json(buckets);
}

export async function POST(request: NextRequest) {
  const { bucketName } = await request.json();
  if (!bucketName || typeof bucketName !== "string") {
    return NextResponse.json(
      { error: "Bucket name is required" },
      { status: 400 }
    );
  }
  const response = await createBucket(bucketName);
  return NextResponse.json({ status: 200, ...response });
}

export async function DELETE(request: NextRequest) {
  const bucketName = await request.json();
  if (!bucketName || typeof bucketName !== "string") {
    return NextResponse.json(
      { error: "Bucket name is required" },
      { status: 400 }
    );
  }
  const response = await deleteBucket(bucketName);
  return NextResponse.json(response);
}
