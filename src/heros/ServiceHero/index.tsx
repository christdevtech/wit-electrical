import React from 'react'

import type { Service } from '@/payload-types'

import { Media } from '@/components/Media'

export const ServiceHero: React.FC<{
  service: Service
}> = ({ service }) => {
  const { heroImage, title } = service

  return (
    <div className="relative -mt-[10.6rem] md:-mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute pointer-events-none left-0 top-0 w-full h-1/4 bg-gradient-to-b from-black to-transparent" />
      </div>
    </div>
  )
}
