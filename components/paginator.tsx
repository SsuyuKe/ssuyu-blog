'use client';

import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatorProps {
  totalPages?: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  maxVisible?: number; // 最大顯示頁碼
}

export default function Paginator({
  totalPages = 1,
  initialPage = 1,
  onPageChange,
  maxVisible = 5,
}: PaginatorProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    onPageChange?.(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 滾回頁頂
  };

  const renderPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

    // 開頭
    if (start > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            aria-current={currentPage === 1 ? 'page' : undefined}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (start > 2) pages.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    // 中間頁碼
    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
            aria-current={i === currentPage ? 'page' : undefined}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // 結尾
    if (end < totalPages) {
      if (end < totalPages - 1)
        pages.push(<PaginationEllipsis key="end-ellipsis" />);
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            aria-current={currentPage === totalPages ? 'page' : undefined}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="flex justify-center my-6 md:my-8">
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          <PaginationLink
            onClick={() =>
              currentPage !== 1 && handlePageChange(currentPage - 1)
            }
            className={`cursor-pointer ${
              currentPage === 1
                ? 'opacity-50 pointer-events-none cursor-not-allowed'
                : ''
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {/* 頁碼 */}
        {renderPageNumbers()}

        {/* Next */}
        <PaginationItem>
          <PaginationLink
            onClick={() =>
              currentPage !== totalPages && handlePageChange(currentPage + 1)
            }
            className={`cursor-pointer ${
              currentPage === totalPages
                ? 'opacity-50 pointer-events-none cursor-not-allowed'
                : ''
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
