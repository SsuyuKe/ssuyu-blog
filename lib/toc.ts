export function extractTocFromMdx(content: string) {
  const headingRegex = /^#{1,3}\s+(.*)$/gm;
  const toc: { id: string; title: string; level: number }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1].trim();
    const level = match[0].split(' ')[0].length;
    const id = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '');
    toc.push({ id, title, level });
  }

  return toc;
}
