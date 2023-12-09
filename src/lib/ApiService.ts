import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import {
  COMMENT_URL,
  POST_URL,
  SEARCH_URL,
  USER_POST_URL,
} from "./apiEndPoints";

export async function fetchPosts() {
  const res = await fetch(POST_URL);
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  if (response?.status === 200) {
    return response!.posts;
  }
  return null;
}

export async function fetchPost(postId: number): Promise<Post | null> {
  const res = await fetch(POST_URL + "/" + postId);
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  if (response?.status === 200) {
    return response!.post;
  }
  return null;
}

// * Search posts
export async function searchPost(
  query: string
): Promise<Array<Post> | null | []> {
  const res = await fetch(`${SEARCH_URL}?query=${query}`);
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  if (response?.status === 200) {
    return response!.posts;
  }
  return null;
}

// * Fetch Comments
export async function fetchComments(postId: number) {
  const res = await fetch(`${COMMENT_URL}?post_id=${postId}`);
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  if (response?.status === 200) {
    return response!.comments;
  }
  return null;
}

// * Fetch Comments
export async function fetchUserPosts(userId: string, user: CustomUser) {
  const res = await fetch(`${USER_POST_URL}?user_id=${userId}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  if (response?.status === 200) {
    return response!.posts;
  }
  return null;
}
