"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import axios from "axios";
import { POST_URL } from "@/lib/apiEndPoints";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

export default function DeletePost({
  postId,
  user,
}: {
  postId: number;
  user: CustomUser;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const deletePost = () => {
    axios
      .delete(`${POST_URL}/${postId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        toast.success("Post Deleted successfully!", { theme: "colored" });
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong.please try again!", {
          theme: "colored",
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash
          color="red"
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>You can't undone this action.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={deletePost} variant="destructive">
            Yes Delete it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
