"use client";
import React from "react";
import UserAvatar from "./UserAvatar";
import { createSlugUrl, formatDate, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="w-full md:w-[700px] mb-4 flex justify-between items-center border-b">
      <Link href={`/post/${createSlugUrl(post.title, post.id)}`}>
        <div className="flex space-x-2 items-center">
          <UserAvatar name={post?.user?.name[0].toUpperCase()} h={10} w={10} />
          <p className="text-sm">{post?.user?.name}</p>
        </div>

        <p className="font-bold text-xl">{post.title}</p>
        <div className="text-gray-500">
          <p>{post.short_description}</p>
          <div className="flex items-center justify-between my-2">
            <p>{formatDate(post.created_at)}</p>
            <p>4 min read</p>
            <Bookmark size={18} />
          </div>
        </div>
      </Link>
      <div>
        {post.image && (
          <Image
            src={getImageUrl(post.image!)}
            alt="thumbnail"
            width={200}
            height={200}
            className="object-contain rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
