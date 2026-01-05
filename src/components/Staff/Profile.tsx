import React from 'react'
import type { Partner } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = {
  partner: Partner
  className?: string
}

export const PartnerProfile: React.FC<Props> = ({ partner, className }) => {
  const { media, name, position, founder, content } = partner

  return (
    <div className={cn('container', className)}>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden border border-border">
            <Media resource={media} imgClassName="object-cover w-full h-full" />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">{name}</h1>
            <p className="mt-3 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary">
              {position || 'Partner'}
            </p>
          </div>
          <RichText data={content as any} enableGutter={false} />
        </div>
      </div>
    </div>
  )
}
