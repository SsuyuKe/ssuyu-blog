import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PostData } from '@/types/post';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function toDate(d: string | Date) {
  return d instanceof Date ? d : new Date(d);
}

export const sortByPublishedAtDesc = (posts: PostData[]) => {
  return posts.slice().sort((a, b) => {
    return (
      toDate(b.metadata.publishedAt).getTime() -
      toDate(a.metadata.publishedAt).getTime()
    );
  });
};
