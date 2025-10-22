'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { HeaderNav } from './Nav'
import { Menu, X } from 'lucide-react'

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

  // close mobile menu on route change
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const closeMenu = () => setIsMenuOpen(false)
  const openMenu = () => setIsMenuOpen(true)

  // Determine which logo to display based on theme and available uploads
  const isDarkMode = theme === 'dark'
  const hasLightModeLogo = data?.lightModeLogo && typeof data.lightModeLogo === 'object'
  const hasDarkModeLogo = data?.darkModeLogo && typeof data.darkModeLogo === 'object'

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between items-center">
        <Link href="/">
          {isDarkMode && hasDarkModeLogo ? (
            <Media
              resource={data.darkModeLogo}
              loading="eager"
              priority={true}
              alt="Dark Mode Logo"
              className="max-w-[9.375rem] w-full h-[34px]"
            />
          ) : !isDarkMode && hasLightModeLogo ? (
            <Media
              resource={data.lightModeLogo}
              loading="eager"
              priority={true}
              alt="Light Mode Logo"
              className="max-w-[9.375rem] w-full h-[34px]"
            />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          )}
        </Link>
        <div className="hidden md:block">
          <HeaderNav data={data} />
        </div>
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-primary/30 text-primary"
          onClick={openMenu}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={closeMenu} aria-hidden="true" />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[80vw] max-w-[300px] bg-white dark:bg-neutral-900 shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/" onClick={closeMenu} className="block">
            {isDarkMode && hasDarkModeLogo ? (
              <Media
                resource={data.darkModeLogo}
                loading="eager"
                priority={true}
                alt="Dark Mode Logo"
                className="max-w-[9.375rem] w-full h-[34px]"
              />
            ) : !isDarkMode && hasLightModeLogo ? (
              <Media
                resource={data.lightModeLogo}
                loading="eager"
                priority={true}
                alt="Light Mode Logo"
                className="max-w-[9.375rem] w-full h-[34px]"
              />
            ) : (
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            )}
          </Link>
          <button
            aria-label="Close menu"
            className="inline-flex items-center justify-center p-2 rounded-md border border-primary/30 text-primary"
            onClick={closeMenu}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-4">
          <HeaderNav data={data} mobile />
        </div>
      </aside>
    </header>
  )
}
