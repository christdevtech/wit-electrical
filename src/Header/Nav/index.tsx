'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType; mobile?: boolean; className?: string }> = ({ data, mobile, className }) => {
  const navItems = data?.navItems || []

  return (
    <nav className={className ?? (mobile ? 'flex flex-col gap-4' : 'flex gap-3 items-center')}>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className={mobile ? 'text-lg' : undefined} />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className={mobile ? 'w-6 text-primary' : 'w-5 text-primary'} />
      </Link>
    </nav>
  )
}
