'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType; mobile?: boolean; className?: string }> = ({
  data,
  mobile,
  className,
}) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  return (
    <nav className={className ?? (mobile ? 'flex flex-col gap-4' : 'flex gap-3 items-center')}>
      {navItems.map(({ link }, i) => {
        const type = link.type
        const reference = link.reference
        const url = link.url

        const href =
          type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
            ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
                (reference.value as any).slug
              }`
            : url

        const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href as string)) // Simple active check

        return (
          <CMSLink
            key={i}
            {...link}
            appearance={undefined}
            className={cn(
              mobile
                ? 'text-lg p-2 rounded'
                : 'text-base font-medium px-2 border-b-2 border-transparent hover:border-primary hover:no-underline rounded-none transition-colors duration-200', // Added base desktop styles
              isActive && 'font-semibold',
              !mobile && isActive && 'border-primary', // Active state ensures border is visible
              mobile && isActive && 'bg-primary/10',
            )}
          />
        )
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className={mobile ? 'w-6 text-primary' : 'w-5 text-primary'} />
      </Link>
    </nav>
  )
}
