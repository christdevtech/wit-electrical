import type { Service, ServiceCardBlock as ServiceCardBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { BlockWrapper } from '@/components/BlockWrapper'
import { ServiceSwiper } from './ServiceSwiper'

export const ServiceCardBlock: React.FC<
  ServiceCardBlockProps & {
    id?: string
    className?: string
    backgroundVariant?: 'color' | 'image'
    colorTheme?: string | null
    backgroundImage?: any
    imageTextColor?: 'white' | 'black' | null
    blockId?: string | null
  }
> = async (props) => {
  const {
    id,
    className,
    backgroundVariant,
    colorTheme,
    backgroundImage,
    imageTextColor,
    blockId,
    introContent,
    populateBy,
    limit: limitFromProps,
    selectedDocs,
    cardStyle,
  } = props

  const limit = limitFromProps || 10

  let services: Service[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedServices = await payload.find({
      collection: 'services',
      limit,
      depth: 1, // Ensure we get image data
    })

    services = fetchedServices.docs
  } else {
    if (selectedDocs?.length) {
      services = selectedDocs.map((doc) => {
        if (typeof doc.value === 'object') return doc.value
      }) as Service[]
    }
  }

  // Filter out any undefined/null services just in case
  services = services.filter(Boolean)

  if (!services.length) {
    return null
  }

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      imageTextColor={imageTextColor}
      blockId={blockId ?? id}
      className={className}
    >
      <div className="container">
        {introContent && (
          <div className="mb-8 max-w-2xl">
            <RichText data={introContent} enableGutter={false} />
          </div>
        )}

        <ServiceSwiper services={services} cardStyle={cardStyle || 'standard'} />
      </div>
    </BlockWrapper>
  )
}
