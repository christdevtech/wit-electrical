'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import type { Partner } from '@/payload-types'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'

type Props = {
  partner: Partner
  featured?: boolean
  className?: string
  aspectRatio?: string
}

export const PartnerCard: React.FC<Props> = ({
  partner,
  featured,
  className,
  aspectRatio = 'aspect-[3/4]',
}) => {
  const { media, name, position, slug, founder } = partner

  return (
    <Link
      href={`/partners/${slug}`}
      className={cn(
        'group relative flex flex-col bg-background dark:bg-card shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full',
        className,
      )}
    >
      {/* Image Container */}
      <div className={cn('relative w-full', aspectRatio, 'overflow-hidden')}>
        <Media
          resource={media}
          fill
          imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 object-top"
        />
      </div>

      {/* Gold Strip */}
      <div className="h-1.5 w-full bg-amber-600 dark:bg-amber-400" />

      {/* Content */}
      <div className="relative flex-1 pt-8 pb-6 px-6">
        {/* Badge */}
        <div className="absolute  -top-4 left-6 bg-amber-600 dark:bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white dark:text-slate-900 shadow-sm">
          {position || (founder ? 'Founder/Partner' : 'Partner')}
        </div>

        {/* Name */}
        <h3 className="text-2xl font-bold text-card-foreground leading-tight pr-12">{name}</h3>

        {/* Icon */}
        <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground shadow-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
