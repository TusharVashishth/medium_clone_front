import AppNav from "@/components/common/AppNav";
import React from "react";
import {
  CustomSession,
  authOptions,
} from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import AddArtical from "@/components/artical/AddArtical";

export default async function CreateArtical() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="mb-14">
      <AddArtical user={session?.user!} />
    </div>
  );
}
