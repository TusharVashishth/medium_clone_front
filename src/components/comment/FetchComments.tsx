"use client";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Loading from "@/app/loading";
import { fetchComments } from "@/lib/ApiService";
import React, { useState, useEffect } from "react";
import UserAvatar from "../common/UserAvatar";
import AddComment from "./AddComment";
import { formatDate } from "@/lib/utils";
import CommentCard from "./CommentCard";

export default function FetchComments({
  session,
  postId,
}: {
  session: CustomSession | null;
  postId: number;
}) {
  const [comments, setComments] = useState<Array<CommentType> | [] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    setLoading(true);
    const res = await fetchComments(postId);
    setLoading(false);
    setComments(res);
  };

  const updateState = (comment: CommentType) => {
    setComments([comment, ...comments!]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-10">Comments</h1>
      {loading && <Loading />}
      {comments &&
        comments.length > 0 &&
        comments.map((item, index) => (
          <CommentCard key={index} comment={item} />
        ))}

      <AddComment
        session={session}
        postId={postId}
        updateCallback={updateState}
      />
    </div>
  );
}
