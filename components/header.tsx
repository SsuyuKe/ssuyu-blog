'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './theme-toggle';
import { cn } from '@/lib/utils';
import Container from './container';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Menu from './menu';

export default function Header() {
  const [, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  // 開關選單時鎖定背景卷軸
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const navItems = [
    { name: '首頁', href: '/' },
    { name: '關於我', href: '/#about' },
    { name: '服務項目', href: '/#services' },
    { name: '部落格', href: '/blog' },
    { name: '聯繫我', href: '/#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50',
        isOpen ? 'bg-background' : 'backdrop-blur-md border-border border-b'
      )}
    >
      <Container className="relative">
        {/* 側邊社群 */}
        <div className="absolute right-0 top-[61px] hidden md:flex flex-col items-center gap-3">
          <div className="w-[1px] h-30 bg-border"></div>
          <Link
            href="https://github.com/SsuyuKe"
            target="_blank"
            className="flex justify-center items-center"
          >
            <i className="fa-brands fa-github text-border text-3xl hover:scale-110 transition-transform"></i>
          </Link>
          <Link
            href="https://www.instagram.com/ssuyuke/"
            target="_blank"
            className="flex justify-center items-center"
          >
            <i className="fa-brands fa-square-instagram text-border text-3xl hover:scale-110 transition-transform"></i>
          </Link>
        </div>

        {/* Header 內容 */}
        <div className="h-[60px] flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-sm font-bold">
            <h1>SSUYUKE</h1>
          </Link>

          {/* 菜單區 */}
          <nav className="flex items-center">
            {/* 桌面版 */}
            <ul className="hidden md:flex gap-6 items-center">
              {navItems.map(item => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      'text-sm font-medium',
                      'hover:text-accent-foreground transition-colors duration-300'
                    )}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  onClick={() => router.push('/#contact')}
                  className="uppercase"
                >
                  Hire Me
                </Button>
              </li>
              <li>
                <ThemeToggle />
              </li>
            </ul>

            {/* 漢堡按鈕 */}
            <button
              className="md:hidden relative z-50 w-6 h-6 flex items-center justify-center focus:outline-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className={cn(
                  'relative w-full h-[2px] bg-foreground transition-all duration-400 ease-in-out',
                  isOpen && 'rotate-[135deg]'
                )}
              >
                <span
                  className={cn(
                    'absolute left-0 top-[-0.5rem] w-full h-[2px] bg-foreground transition-all duration-400 ease-in-out',
                    isOpen && 'rotate-90 top-0'
                  )}
                ></span>
                <span
                  className={cn(
                    'absolute left-0 top-[0.5rem] w-full h-[2px] bg-foreground transition-all duration-400 ease-in-out',
                    isOpen && 'rotate-90 top-0 opacity-0'
                  )}
                ></span>
              </div>
            </button>
          </nav>
        </div>
      </Container>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
