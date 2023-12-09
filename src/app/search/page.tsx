import AppNav from "@/components/common/AppNav";
import { searchPost } from "@/lib/ApiService";
import React from "react";
import {
  CustomSession,
  authOptions,
} from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import PostCard from "@/components/common/PostCard";

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session: CustomSession | null = await getServerSession(authOptions);
  const posts: Array<Post> | [] | null = await searchPost(searchParams?.query!);

  return (
    <div>
      <AppNav session={session} />
      <div className="px-2 md:container md:px-0 mt-10 flex flex-col items-center">
        {posts &&
          posts.length > 0 &&
          posts.map((item) => <PostCard post={item} key={item.id} />)}
      </div>
    </div>
  );
}
