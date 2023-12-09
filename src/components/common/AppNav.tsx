"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

import AuthModal from "../auth/AuthModal";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import { Edit } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import { useRouter, useSearchParams } from "next/navigation";

export default function AppNav({ session }: { session: CustomSession | null }) {
  const router = useRouter();
  const searchParam = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search?query=${search}`);
  };

  useEffect(() => {
    if (searchParam.get("query")) {
      setSearch(searchParam.get("query")!);
    }
  }, [searchParam]);

  return (
    <nav className="flex justify-between items-center p-2 border-b">
      <div className="flex space-x-4 items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-15"
          />
        </Link>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-3xl outline-none w-full"
          />
        </form>
      </div>
      <div className="flex items-center space-x-4">
        {session !== null ? (
          <Link href="/write-artical" className="flex items-center space-x-1">
            <Edit size={16} /> <span>Write</span>
          </Link>
        ) : (
          <AuthModal />
        )}

        {session != null ? <ProfileAvatar user={session?.user!} /> : <></>}
      </div>
    </nav>
  );
}
