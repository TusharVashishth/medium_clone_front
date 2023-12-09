"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
  url,
  name,
  h = 10,
  w = 10,
}: {
  h?: number;
  w?: number;
  url?: string;
  name?: string;
}) {
  return (
    <Avatar className={`cursor-pointer h-${h} w-${w}`}>
      <AvatarImage src={url} />
      <AvatarFallback> {name ?? "Tu"}</AvatarFallback>
    </Avatar>
  );
}
