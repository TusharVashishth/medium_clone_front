import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import slugify from "slugify";
import Env from "./Env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string): string => {
  return moment(date).fromNow();
};

export const getImageUrl = (path: string) => {
  return `${Env.API_URL}/storage/${path}`;
};

// * Create Slugify url
export const createSlugUrl = (title: string, id: number): string => {
  const slug = slugify(title, {
    remove: undefined,
    trim: true,
    strict: true,
  });

  const slugUrl = slug + "-" + id;
  return slugUrl;
};

// * Extract id from slug url
export const extractId = (slug: string): number => {
  const parts = slug.split("-");
  const postId = parseInt(parts[parts.length - 1]);
  return postId;
};
