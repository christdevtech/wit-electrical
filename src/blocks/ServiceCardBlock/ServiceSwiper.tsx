'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { Service } from '@/payload-types'
import { ServiceCard } from './ServiceCard'

type Props = {
  services: Service[]
  cardStyle: 'standard' | 'sharp' | 'glass'
}

export const ServiceSwiper: React.FC<Props> = ({ services, cardStyle }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={services.length > 3}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full !pb-12"
      >
        {services.map((service, index) => (
          <SwiperSlide key={service.id || index} className="h-auto">
            <ServiceCard service={service} style={cardStyle} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
