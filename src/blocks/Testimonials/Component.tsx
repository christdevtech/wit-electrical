import React from 'react'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const TestimonialsBlock: React.FC<
  TestimonialsBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, title, testimonials } = props

  return (
    <div id={`block-${id}`} className="my-16 py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">{title}</h2>}
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
              <p className="font-semibold text-blue-600">{testimonial.clientName}</p>
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
    </div>
  )
}
