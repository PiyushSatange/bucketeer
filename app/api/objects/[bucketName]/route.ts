import {
  deleteObjectInBucket,
  getPresignedUrl,
  listObjectsInBucket,
} from "@/lib/s3Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { bucketName: string } }
) {
  const bucketName = params.bucketName;
  if (!bucketName) {
    return NextResponse.json({ status: 400, error: "Bucket name is required" });
  }
  const response = await listObjectsInBucket(bucketName);
  return NextResponse.json(response);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { bucketName: string } }
) {
  const { fileName } = await request.json();
  const bucketName = params.bucketName;
  const response = await getPresignedUrl(bucketName, fileName);
  return NextResponse.json(response);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { bucketName: string } }
) {
  const bucketName = params.bucketName;
  const { fileName } = await request.json();
  if (!bucketName) {
    return NextResponse.json({ status: 400, error: "Bucket name is required" });
  }
  const response = await deleteObjectInBucket(bucketName, fileName);
  return NextResponse.json(response);
}
