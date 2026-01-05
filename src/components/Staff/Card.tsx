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
        'group relative flex flex-col bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden h-full',
        className,
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          'relative w-full',
          aspectRatio,
          'overflow-hidden bg-slate-200 dark:bg-slate-800',
        )}
      >
        <Media
          resource={media}
          fill
          imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 object-top"
        />
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="relative flex-1 p-6 flex flex-col justify-center">
        {/* Name */}
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 leading-tight pr-8 mb-2">
          {name}
        </h3>

        {/* Position */}
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {position || (founder ? 'Founder/Partner' : 'Partner')}
        </div>

        {/* Icon */}
        <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 shadow-sm transition-all duration-300 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 dark:group-hover:bg-slate-100 dark:group-hover:text-slate-900">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
