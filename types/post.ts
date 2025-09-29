export type PostMeta = {
  title: string;
  description: string;
  cover: string;
  publishedAt: string;
  updatedAt?: string;
  isPublished: boolean;
  tags?: string[];
  category: string;
};

export type PostData = {
  metadata: PostMeta;
  slug: string;
  content: string;
};
