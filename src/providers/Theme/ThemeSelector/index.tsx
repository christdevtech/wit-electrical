'use client'

import { Moon, Sun } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/utilities/ui'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: 'light' | 'dark' | 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  const isDark = value === 'dark'

  return (
    <button
      onClick={() => onThemeChange(value === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-4 left-4 z-50 flex items-center justify-center p-2 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg hover:bg-white/50 dark:hover:bg-black/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary text-primary"
      aria-label="Toggle theme"
      data-theme={isDark ? 'dark' : 'light'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={cn(
            'absolute w-5 h-5 transition-all text-yellow-500 fill-yellow-500',
            isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100',
          )}
        />
        <Moon
          className={cn(
            'absolute w-5 h-5 transition-all text-primary fill-primary',
            isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0',
          )}
        />
      </div>
    </button>
  )
}
