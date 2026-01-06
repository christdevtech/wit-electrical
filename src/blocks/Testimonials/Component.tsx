import React from 'react'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { BlockWrapper } from '@/components/BlockWrapper'

type Props = TestimonialsBlockProps & {
  id?: string
  className?: string
  backgroundVariant?: 'color' | 'image'
  colorTheme?: string | null
  backgroundImage?: any
  imageTextColor?: 'white' | 'black' | null
  blockId?: string | null
}

export const TestimonialsBlock: React.FC<Props> = (props) => {
  const {
    id,
    title,
    testimonials,
    className,
    backgroundVariant,
    colorTheme,
    backgroundImage,
    imageTextColor,
    blockId,
  } = props

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      imageTextColor={imageTextColor}
      blockId={blockId ?? id}
      className={className}
    >
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              {testimonial.image && (
                <div className="mb-4">
                  <Media
                    resource={testimonial.image}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
              <div className="text-center mb-4">
                <RichText data={testimonial.quote} enableGutter={false} />
              </div>
              <p className="font-semibold">{testimonial.clientName}</p>
              {testimonial.rating && (
                <div className="text-yellow-500 mt-2">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BlockWrapper>
  )
}
