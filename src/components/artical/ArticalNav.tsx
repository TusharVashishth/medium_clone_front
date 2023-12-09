import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ArticalNav({
  title,
  loading,
  callback,
}: {
  title: string;
  loading: boolean;
  callback: () => void;
}) {
  return (
    <div className="border-b">
      <div className="container flex justify-between items-center p-1.5">
        <div className="flex space-x-2">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
          </Link>

          <p>Write Artical</p>
        </div>
        <Button
          size="sm"
          disabled={title.length < 10 || loading}
          onClick={callback}
        >
          {loading ? "Saving.." : "Save"}
        </Button>
      </div>
    </div>
  );
}
