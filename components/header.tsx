'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemeToggle from './theme-toggle';
import { cn } from '@/lib/utils';

export default function Header() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const safeTheme = mounted ? theme || 'light' : 'light';

  const nevItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '#' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50',
        'bg-opacity-70 backdrop-blur-md',
        'flex justify-between items-center p-6',
        safeTheme === 'dark'
          ? 'bg-dark-bg text-dark-text border-b border-dark-line'
          : 'bg-light-bg text-light-text border-b border-light-line'
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'font-bold text-xl',
          safeTheme === 'dark' ? 'text-dark-accent' : 'text-light-accent'
        )}
      >
        MyPortfolio
      </div>

      {/* 菜單 & 漢堡 */}
      <nav className="flex items-center">
        {/* 桌面選單 */}
        <ul className="hidden md:flex gap-6">
          {nevItems.map(item => (
            <li key={item.name}>
              <a
                className={cn('hover:text-accent-foreground')}
                href={item.href}
              >
                {item.name}
              </a>
            </li>
          ))}
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
                <a
                  className={cn(
                    `block px-4 py-2 hover:bg-accent text-${safeTheme}-text`
                  )}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // 點擊後關閉選單
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        )}
        {/* 主題切換按鈕 */}
        <ThemeToggle />
      </nav>
    </header>
  );
}
