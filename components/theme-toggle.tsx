'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    // SSR 時先不渲染 icon
    return (
      <Button variant="ghost" size="icon" className="relative">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = theme === 'dark'
  const safeTheme = theme || 'light'

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Sun
        className={clsx(
          'absolute h-5 w-5 transition-transform duration-500',
          'transition-opacity',
          isDark ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100',
          'text-foreground'
        )}
      />
      <Moon
        className={clsx(
          'absolute h-5 w-5 transition-transform duration-500',
          'transition-opacity',
          isDark ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0',
          'text-foreground'
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
