"use client";
import React, { useState, useRef } from "react";
import Tiptap from "../common/Tiptap";
import ArticalNav from "./ArticalNav";
import { Image } from "lucide-react";
import ImagePreview from "./ImagePreview";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import axios from "axios";
import { POST_URL } from "@/lib/apiEndPoints";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddArtical({ user }: { user: CustomUser }) {
  const [title, setTitle] = useState<string>("");
  const [shortDes, setShortDes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const router = useRouter();

  // * Editor setup
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your content here....",
      }),
    ],
  });

  const handleIconClick = () => {
    imageRef.current?.click();
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };

  const removePreview = () => {
    setImage(null);
    setPreviewUrl(undefined);
  };

  // * Handle Submit
  const handleSubmit = () => {
    setLoading(true);
    const html = editor?.getHTML();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("title", title);
    formData.append("short_description", shortDes);
    formData.append("content", html ?? "");

    axios
      .post(POST_URL, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        toast.success("Post Created successfully!", { theme: "colored" });
        router.push("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong.please try again!", {
          theme: "colored",
        });
      });
  };

  return (
    <div>
      <ArticalNav title={title} callback={handleSubmit} loading={loading} />
      <div className="container">
        {previewUrl && (
          <div className="mt-4">
            <ImagePreview url={previewUrl} callback={removePreview} />
          </div>
        )}
        <div className="mt-4">
          <input
            type="file"
            ref={imageRef}
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/gif,image/jpg"
            onChange={handleImageChange}
          />
          <Image
            onClick={handleIconClick}
            height={20}
            width={20}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-4">
          <input
            className="outline-none h-10 text-4xl font-bold border-none w-full"
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mt-4">
          <input
            className="outline-none h-10 text-2xl font-bold border-none w-full"
            placeholder="Short Description"
            onChange={(event) => setShortDes(event.target.value)}
          />
        </div>
        <div className="mt-4">
          <Tiptap editor={editor} />
        </div>
      </div>
    </div>
  );
}
