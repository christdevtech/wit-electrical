import React from 'react'
import type { Partner } from '@/payload-types'
import { PartnerCard } from './Card'
import { cn } from '@/utilities/ui'

type Props = {
  partners: Partner[]
  className?: string
}

export const PartnerGrid: React.FC<Props> = ({ partners, className }) => {
  const featured = partners.find((p) => p.founder)
  const rest = partners.filter((p) => p.slug !== featured?.slug)

  return (
    <div className={cn('container', className)}>
      {featured && (
        <div className="mb-10 md:mb-16 flex justify-center">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <PartnerCard featured partner={featured} />
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} aspectRatio="aspect-[4/5]" />
        ))}
      </div>
    </div>
  )
}
