import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

import { ArchiveHero } from '@/heros/ArchiveHero'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pb-24">
      <PageClient />
      <ArchiveHero type="services" />
      <div className="mt-16"></div>
      <CollectionArchive docs={services.docs} relationTo="services" />

      <div className="container">
        {services.totalPages > 1 && services.page && (
          <Pagination page={services.page} totalPages={services.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Wit Electrical Services`,
  }
}
