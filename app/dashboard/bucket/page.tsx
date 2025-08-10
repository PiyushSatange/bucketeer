"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function BucketPage() {
  const [buckets, setBuckets] = useState([]);
  useEffect(() => {
    const fetchBuckets = async () => {
      const response = await fetch("/api/buckets");
      const data = await response.json();
      if (data.status == 200) {
        setBuckets(data.buckets);
      }
    };
    fetchBuckets();
  }, []);

  return (
    <>
      {buckets.length > 0 ? (
        <div className="grid grid-cols-6 gap-4">
          {buckets.map((bucket: any) => (
            <Link
              href={`/dashboard/bucket/${bucket.Name}`}
              className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <div key={bucket.Name}>
                <Image
                  src="/bucket.png"
                  alt="Bucket Icon"
                  width={150}
                  height={150}
                />
                {bucket.Name.length > 18
                  ? `${bucket.Name.substring(0, 18)}...`
                  : bucket.Name}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>No buckets found</div>
      )}
    </>
  );
}
