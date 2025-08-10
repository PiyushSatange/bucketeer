"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { LogOut, SwatchBookIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const sidebarItems = [
  { id: 1, name: "Dashboard", path: "/dashboard" },
  { id: 2, name: "Buckets", path: "/dashboard/bucket" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* page */}
      <div className="flex flex-row bg-background-secondary h-screen text-white">
        {/* left side */}
        <div className="w-1/5">
          {/* sidebar */}
          <div className="bg-background  h-full flex flex-col justify-between p-7 gap-20">
            {/* logo */}
            <div className="flex justify-center items-center text-2xl font-extrabold tracking-wider text-primary">
              <Image
                src="/bucket.png"
                alt="Vercel logomark"
                width={80}
                height={80}
              />
              <span>Bucketeer</span>
            </div>
            {/* sidebar items */}
            <div className="flex flex-col gap-10  flex-1 pl-5 ">
              {sidebarItems.map((item) => (
                <div key={item.id}>
                  <Link href={item.path}>{item.name}</Link>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-5 pl-5">
              <UserButton
                appearance={{
                  elements: {
                    userButtonBox: "text-white order-1",
                    userButtonName: "order-2 ml-2 text-white",
                  },
                }}
                showName={true}
              />
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex flex-col h-screen w-full">
          <div className="h-[10%]">
            <div className="flex justify-end items-center h-full pr-5 gap-2">
              <span>Light</span>
              <SwatchBookIcon />
              <span>Dark</span>
            </div>
          </div>
          <div className="flex-1 p-10">{children}</div>
          <div className="h-[10%] ">
            <div className="flex justify-center items-center h-full">
              <span className="text-sm text-gray-400">
                © {new Date().getFullYear()} Bucketeer. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
