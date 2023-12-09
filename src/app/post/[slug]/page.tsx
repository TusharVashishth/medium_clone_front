import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/authOptions";
import AppNav from "@/components/common/AppNav";
import { fetchPost } from "@/lib/ApiService";
import { extractId, getImageUrl } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { Metadata } from "next/types";
import React from "react";
import Image from "next/image";
import FetchComments from "@/components/comment/FetchComments";

export const metadata: Metadata = {
  title: "Show Post",
  description: "Medium clone Show Post",
};

export default async function ShowPost({
  params,
}: {
  params: { slug: string };
}) {
  const session: CustomSession | null = await getServerSession(authOptions);
  const post: Post | null = await fetchPost(extractId(params?.slug));
  return (
    <div>
      <AppNav session={session} />
      <div className="w-full px-4 md:container my-2">
        {post?.image && (
          <Image
            src={getImageUrl(post.image!)}
            alt={post.title}
            width={100}
            height={100}
            className="w-full object-contain rounded-lg"
            unoptimized
          />
        )}

        <h1 className="text-2xl md:text-4xl font-bold mt-4 mb-2">
          {post?.title}
        </h1>
        <p className="text-xl font-bold mt-2 mb-2">{post?.short_description}</p>
        {post?.content && (
          <div dangerouslySetInnerHTML={{ __html: post?.content! }} />
        )}
        {/* Add Comments */}
        <FetchComments session={session} postId={post?.id!} />
      </div>
    </div>
  );
}
