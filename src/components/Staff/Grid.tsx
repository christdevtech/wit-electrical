import React from 'react'
import type { Staff } from '@/payload-types'
import { StaffCard } from './Card'
import { cn } from '@/utilities/ui'

type Props = {
  partners: Staff[]
  className?: string
}

export const StaffGrid: React.FC<Props> = ({ partners, className }) => {
  const featured = partners.find((p) => p.founder)
  const rest = partners.filter((p) => p.slug !== featured?.slug)

  return (
    <div className={cn('container', className)}>
      {featured && (
        <div className="mb-10 md:mb-16 flex justify-center">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <StaffCard featured partner={featured} />
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((partner) => (
          <StaffCard key={partner.id} partner={partner} aspectRatio="aspect-[4/5]" />
        ))}
      </div>
    </div>
  )
}
