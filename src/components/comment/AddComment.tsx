"use client";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { COMMENT_URL } from "@/lib/apiEndPoints";
import { Button } from "../ui/button";

export default function AddComment({
  session,
  postId,
  updateCallback,
}: {
  session: CustomSession | null;
  postId: number;
  updateCallback: (comment: CommentType) => void;
}) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (session === null) {
      toast.warn("Please login first!", { theme: "colored" });
      return;
    }
    setLoading(true);
    axios
      .post(
        COMMENT_URL,
        { content: content, post_id: postId },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        const response = res.data;
        let comment = response?.comment;
        comment["user"] = session?.user;
        setContent("");
        updateCallback(comment);
        toast.success("Commented successfully!", { theme: "colored" });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mt-5">Add Comment</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="outline-none bg-muted rounded-lg h-20 w-full p-2"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your comment..."
          value={content}
        ></textarea>
        <Button type="submit" disabled={loading}>
          {" "}
          {loading ? "Processing.." : "Comment"}{" "}
        </Button>
      </form>
    </div>
  );
}
