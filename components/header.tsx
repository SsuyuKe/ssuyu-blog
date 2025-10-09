'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemeToggle from './theme-toggle';
import { cn } from '@/lib/utils';
import Container from './container';
import Link from 'next/link';

export default function Header() {
  const [, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const nevItems = [
    { name: '首頁', href: '/' },
    { name: '作品集', href: '#' },
    { name: '部落格', href: '/blog' },
    { name: '轉職前端諮詢', href: '#' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50',
        'bg-opacity-70 backdrop-blur-md border-border border-b'
      )}
    >
      <Container>
        <div className={cn('h-[60px]', 'flex justify-between items-center')}>
          {/* Logo */}
          <div className={cn('text-sm font-medium')}>Ssuyu</div>
          {/* 菜單 & 漢堡 */}
          <nav className="flex items-center">
            {/* 桌面選單 */}
            <ul className="hidden md:flex gap-6 items-center">
              {nevItems.map(item => (
                <li key={item.name}>
                  <a
                    className={cn(
                      'hover:text-accent-foreground text-sm font-medium'
                    )}
                    href={item.href}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="flex justify-center items-center">
                {/* 主題切換按鈕 */}
                <ThemeToggle />
              </li>
            </ul>

            {/* 漢堡按鈕 */}
            <button
              className="md:hidden ml-4 p-2 rounded focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* 手機下拉選單 */}
            {isOpen && (
              <ul
                className={cn(
                  'flex flex-col md:hidden p-2 gap-2',
                  'absolute top-full right-0',
                  'mt-2 w-40 rounded shadow-md',
                  'bg-background border border-border'
                )}
              >
                {nevItems.map(item => (
                  <li key={item.name}>
                    <Link
                      className="px-4 py-2 hover:bg-accent"
                      href={item.href}
                      onClick={() => setIsOpen(false)} // 點擊後關閉選單
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
