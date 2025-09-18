'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative } from 'swiper/modules'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { SwiperWithSideTextBlock } from '@/payload-types'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-creative'

type SwiperClientProps = {
  slides?: SwiperWithSideTextBlock['slides']
}

export const SwiperClient: React.FC<SwiperClientProps> = ({ slides }) => {
  return (
    <Swiper
      grabCursor={true}
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      loop={true}
      modules={[EffectCreative]}
      className="mySwiper"
      autoplay={{
        delay: 3000,
      }}
    >
      {slides?.map((slide, index) => (
        <SwiperSlide key={`slide-${index}`} className="bg-white rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="h-[50dvh] overflow-hidden relative">
              <Media resource={slide.image} fill imgClassName="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 gap-8">
              <RichText className="text-xl" data={slide.description} enableGutter={false} />
              <div className="space-x-6">
                {slide.buttons?.map((button, index) => {
                  return <CMSLink {...button.link} key={`button-${index}`}></CMSLink>
                })}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
