import React from "react";
import UserAvatar from "../common/UserAvatar";
import { formatDate } from "@/lib/utils";

export default function CommentCard({ comment }: { comment: CommentType }) {
  return (
    <div className="flex space-x-2 items-start mb-5">
      <UserAvatar name={comment?.user?.name[0].toUpperCase()} />
      <div className="bg-muted rounded-lg p-2">
        <p>{comment.content}</p>
        <p className="mt-4 text-gray-500">{formatDate(comment.created_at)}</p>
      </div>
    </div>
  );
}
