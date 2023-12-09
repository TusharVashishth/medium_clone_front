"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import DeletePost from "./DeletePost";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";

export default function PostTable({
  posts,
  user,
}: {
  posts: Array<Post>;
  user: CustomUser;
}) {
  return (
    <Table>
      <TableCaption>A list of your posts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              {item?.image ? (
                <Image
                  src={getImageUrl(item.image)}
                  width={40}
                  height={40}
                  alt="image"
                  className="rounded-full w-10 h-10"
                />
              ) : (
                "N/A"
              )}
            </TableCell>
            <TableCell>{formatDate(item.created_at)}</TableCell>
            <TableCell className="text-right">
              <DeletePost postId={item.id} user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
