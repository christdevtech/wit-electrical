import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Media } from '@/components/Media'
import ArchiveHeroClient from './client'

export const ArchiveHero: React.FC<{ type: 'services' | 'posts' }> = async ({ type }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const archiveHero: any = await getCachedGlobal('archive-hero' as any, 1)()

  const heroData = type === 'services' ? archiveHero?.servicesHero : archiveHero?.postsHero
  const title = heroData?.title || (type === 'services' ? 'Our Services' : 'Posts')
  const description = heroData?.description
  const heroImage = heroData?.heroImage

  return (
    <div
      className="relative -mt-[10.4rem] flex items-end justify-center min-h-[60vh] text-center text-white"
      data-theme="dark"
    >
      <ArchiveHeroClient />
      <div className="container z-10 relative pb-16 pt-32">
        <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold">{title}</h1>
        {description && (
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">{description}</p>
        )}
      </div>

      <div className="absolute inset-0 select-none overflow-hidden h-full">
        {heroImage && typeof heroImage === 'object' ? (
          <>
            <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute pointer-events-none left-0 top-0 w-full h-full bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black" />
        )}
      </div>
    </div>
  )
}
