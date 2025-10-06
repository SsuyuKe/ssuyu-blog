import React, { PropsWithChildren } from 'react';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import { highlight } from 'sugar-high';

function Blockquote(
  props: PropsWithChildren<React.BlockquoteHTMLAttributes<HTMLQuoteElement>>
) {
  return <blockquote {...props} />;
}

function Code({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLElement>>) {
  const codeHTML = highlight(children as string);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

interface CustomLinkProps
  extends PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>> {
  href: string;
}
function CustomLink({ href, children, ...rest }: CustomLinkProps) {
  if (href.startsWith('/')) {
    // Next.js 內部連結
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  if (href.startsWith('#')) {
    // 頁內錨點
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  // 外部連結
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function RoundedImage({ alt, ...rest }: PropsWithChildren<ImageProps>) {
  return <Image alt={alt} className="rounded-lg" {...rest} />;
}

export function slugify(str: string) {
  return str
    .toString() // 確保輸入是字串，不是數字或其他型別
    .trim() // 去掉頭尾多餘空格
    .replace(/\s+/g, '-') // 空格轉連字符，將中間的空白字元（空格、換行）換成連字號 "-"
    .replace(/[#\[\](){}]/g, '') // 移除特定符號
    .replace(/[.,!?;:'"]/g, '') // 移除標點符號
    .replace(/&/g, '-and-') // & 轉 and，將 & 符號換成 "-and-"
    .replace(/\-\-+/g, '-') // 多個連字符合併，將連續多個 "-" 合併成一個 "-"
    .replace(/^-+/, '') // 移除開頭的連字符
    .replace(/-+$/, ''); // 移除結尾的連字符
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug =
      typeof children === 'string'
        ? slugify(children)
        : typeof children === 'number'
          ? slugify(children.toString())
          : '';

    return React.createElement(
      `h${level}`,
      /* 滾動向上的 offset */
      { id: slug, className: 'group scroll-mt-28' },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className:
            'mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-primary no-underline inline-block',
          'aria-label': 'Link to this section',
        }),
        children,
      ]
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

// Table 樣式
const tableStyles = {
  wrapper: 'overflow-x-auto w-full my-4 rounded-sm shadow',
  table: 'w-full min-w-[600px] border-collapse',
  thead: 'bg-primary/90 text-primary-foreground',
  th: 'px-4 py-3 text-left font-semibold border-b border-border',
  tbody: '',
  tr: '',
  td: 'px-4 py-3 text-foreground',
};

// Table 對應
const TableComponents = {
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className={`${tableStyles.wrapper} bg-card dark:bg-card`}>
      <table className={tableStyles.table} {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={tableStyles.thead} {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className={tableStyles.th} {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={tableStyles.tbody} {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={tableStyles.tr} {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className={tableStyles.td} {...props} />
  ),
};

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  blockquote: Blockquote,
  ...TableComponents,
};

export default function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
