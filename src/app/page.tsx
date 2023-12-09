import AppNav from "@/components/common/AppNav";
import { getServerSession } from "next-auth";
import {
  CustomSession,
  authOptions,
} from "./api/auth/[...nextauth]/authOptions";
import { fetchPosts } from "@/lib/ApiService";
import PostCard from "@/components/common/PostCard";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const posts: Array<Post> | null = await fetchPosts();
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
