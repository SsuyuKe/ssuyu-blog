import { slugify } from '@/components/custom-mdx';

export function extractTocFromMdx(content: string) {
  const headingRegex = /^(#{1,3})\s+(.*)$/gm;
  const toc: { id: string; title: string; level: number }[] = [];
  const usedIds = new Set<string>();

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    let id = slugify(title);

    if (!id) id = `heading-${toc.length + 1}`;
    else if (usedIds.has(id)) {
      let suffix = 1;
      let newId = id;
      while (usedIds.has(newId)) {
        newId = `${id}-${suffix}`;
        suffix++;
      }
      id = newId;
    }

    usedIds.add(id);
    toc.push({ id, title, level });
  }

  return toc;
}
