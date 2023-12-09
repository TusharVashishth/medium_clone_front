"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../ui/button";

export default function ImagePreview({
  url,
  callback,
}: {
  url: string;
  callback: () => void;
}) {
  return (
    <div className="">
      <div className="relative">
        <Image
          src={url}
          width={100}
          height={100}
          alt="alt"
          className="w-full  object-contain rounded-2xl"
        />
        <div className="absolute top-0 right-2">
          <Button size="sm" className="mt-2" onClick={callback}>
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
}
