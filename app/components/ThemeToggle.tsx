'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Palette } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme('light')
    }
    setMounted(true)
  }, [setTheme])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleThemeChange('light')}
        className={theme === 'light' ? 'bg-primary text-primary-foreground' : ''}
        title="浅色模式"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleThemeChange('dark')}
        className={theme === 'dark' ? 'bg-primary text-primary-foreground' : ''}
        title="深色模式"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleThemeChange('sepia')}
        className={theme === 'sepia' ? 'bg-primary text-primary-foreground' : ''}
        title="护眼模式"
      >
        <Palette className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  )
}
