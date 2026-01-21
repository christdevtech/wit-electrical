'use client'

import React from 'react'
import type { Service, Media as MediaType } from '@/payload-types'
import Link from 'next/link'
import { Media } from '@/components/Media'

type Props = {
  service: Service
  style: 'standard' | 'sharp' | 'glass'
}

export const ServiceCard: React.FC<Props> = ({ service, style }) => {
  const { title, slug, meta, heroImage } = service
  const description = meta?.description
  const image = (heroImage as MediaType) || (meta?.image as MediaType)

  // Common content
  const CardContent = () => (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {image && (
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
            <Media resource={image} fill className="object-cover" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description && <p className="line-clamp-3 text-sm text-muted-foreground">{description}</p>}
      </div>
    </>
  )

  // Standard Style
  if (style === 'standard') {
    return (
      <Link
        href={`/services/${slug}`}
        className="group block h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md dark:bg-card/50"
      >
        <CardContent />
      </Link>
    )
  }

  // Sharp Style
  if (style === 'sharp') {
    return (
      <Link
        href={`/services/${slug}`}
        className="group block h-full overflow-hidden border-2 border-border bg-background transition-all hover:border-primary dark:bg-background/90"
      >
        <CardContent />
      </Link>
    )
  }

  // Glass Style
  if (style === 'glass') {
    return (
      <Link
        href={`/services/${slug}`}
        className="group block h-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/30"
      >
        <CardContent />
      </Link>
    )
  }

  return null
}
