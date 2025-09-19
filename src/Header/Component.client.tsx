'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Determine which logo to display based on theme and available uploads
  const isDarkMode = theme === 'dark'
  const hasLightModeLogo = data?.lightModeLogo && typeof data.lightModeLogo === 'object'
  const hasDarkModeLogo = data?.darkModeLogo && typeof data.darkModeLogo === 'object'

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        <Link href="/">
          {isDarkMode && hasDarkModeLogo ? (
            <Media 
              resource={data.darkModeLogo} 
              loading="eager" 
              priority={true} 
              alt="Dark Mode Logo" 
              className="h-10 w-auto" 
            />
          ) : (!isDarkMode && hasLightModeLogo) ? (
            <Media 
              resource={data.lightModeLogo} 
              loading="eager" 
              priority={true} 
              alt="Light Mode Logo" 
              className="h-10 w-auto" 
            />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
