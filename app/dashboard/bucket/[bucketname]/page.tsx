"use client";

import Loading from "@/components/loading";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

export default function BucketDetailPage({
  params,
}: {
  params: { bucketname: string };
}) {
  const { bucketname } = params;
  const [objects, setObjects] = useState([]);
  const [folders, setFolders] = useState([]);
  const [payload, setPayload] = useState({ folderName: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getObjects() {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/bucket/${bucketname}?prefix=${payload.folderName}`
      );

      const data = await response.json();
      if (data.status === 200) {
        setObjects(data.objects?.Contents);
        // Remove the current folderName prefix from each object's Key and each folder's Prefix
        const prefix = payload.folderName;
        setFolders(
          (data.objects?.CommonPrefixes || []).map((folder: any) => ({
            ...folder,
            Prefix: folder.Prefix.startsWith(prefix)
              ? folder.Prefix.slice(prefix.length)
              : folder.Prefix,
          }))
        );
        setObjects(
          (data.objects?.Contents || [])
            .map((object: any) => ({
              ...object,
              Key: object.Key.startsWith(prefix)
                ? object.Key.slice(prefix.length)
                : object.Key,
            }))
            .filter((object: any) => object.Key !== "")
        );
        // Prevent the original setObjects above
        setLoading(false);
      }
    }
    getObjects();
  }, [payload]);

  return (
    <>
      <button className="bg-primary font-bold text-white p-2 rounded-lg mb-4 cursor-pointer">
        Create Folder
      </button>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {folders?.length > 0 &&
            folders.map((folder: any) => (
              <div
                key={folder.Prefix} // key should be on the outermost element
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                onDoubleClick={() => {
                  setPayload((prev) => ({
                    folderName: prev.folderName + folder.Prefix,
                  }));
                }}
              >
                <div title={folder.Prefix}>
                  <Image
                    src="/folder.png"
                    alt="Folder Icon"
                    width={150}
                    height={150}
                  />
                  <div className="text-center">
                    {folder.Prefix.slice(0, -1).length > 18
                      ? `${folder.Prefix.slice(0, -1).substring(0, 18)}...`
                      : folder.Prefix.slice(0, -1)}
                  </div>
                </div>
              </div>
            ))}
          {objects?.length > 0 &&
            objects.map((object: any) => (
              <div
                key={object.Name} // key should be on the outermost element
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <div title={object.Key}>
                  <Image
                    src="/pdf.png"
                    alt="pdf icon"
                    width={150}
                    height={150}
                  />
                  <div className="text-center">
                    {object.Key.length > 18
                      ? `${object.Key.substring(0, 18)}...`
                      : object.Key}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {!loading && objects?.length === 0 && folders?.length === 0 && (
        <div>No objects found</div>
      )}
    </>
  );
}
