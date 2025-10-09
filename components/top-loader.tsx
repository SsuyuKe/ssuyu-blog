'use client';

import NextTopLoader from 'nextjs-toploader';

export default function TopLoader() {
  return (
    <NextTopLoader
      color="#c83e6b"
      height={3}
      crawlSpeed={200}
      showSpinner={false}
      shadow="0 0 10px #c83e6b, 0 0 5px #c83e6b"
    />
  );
}
