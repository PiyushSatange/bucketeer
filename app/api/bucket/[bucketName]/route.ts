import {
  deleteObjectInBucket,
  getPresignedUrltoUpload,
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
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") || "";
  console.log("this is the prefix", prefix);
  const response = await listObjectsInBucket(bucketName, prefix);
  return NextResponse.json(response);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { bucketName: string } }
) {
  const { fileName } = await request.json();
  const bucketName = params.bucketName;
  const response = await getPresignedUrltoUpload(bucketName, fileName);
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
