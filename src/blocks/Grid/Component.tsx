'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'

import type { GridBlock as GridBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { BlockWrapper } from '@/components/BlockWrapper'
import { StaffCard } from '@/components/Staff/Card'

type Props = GridBlockProps & {
  className?: string
}

const titleSizeMap: Record<string, string> = {
  small: 'text-lg md:text-xl lg:text-2xl xl:text-3xl',
  medium: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl',
  large: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
}

const descriptionSizeMap: Record<string, string> = {
  small: 'text-sm md:text-base ',
  medium: 'text-base md:text-lg',
  large: 'text-lg md:text-xl',
}

export const GridBlock: React.FC<Props> = (props) => {
  const {
    backgroundVariant,
    colorTheme,
    backgroundImage,
    items = [],
    className,
    gridColumns = 4,
    blockId,
  } = props as Props & {
    gridColumns?: number
  }

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      blockId={blockId}
      className={className}
    >
      <div className="container">
        <div className="py-8 md:py-12">
          <div
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 gap-6',
              gridColumns && `lg:grid-cols-${gridColumns}`,
            )}
          >
            {items?.map((item, i) => {
              const { colSpan, colSpanMd, colSpanLg, colSpanXl } = item as any
              const cardTitleSize = (item as any).cardTitleSize || 'medium'
              const cardDescriptionSize = (item as any).cardDescriptionSize || 'medium'

              return (
                <motion.div
                  key={i}
                  className={cn(
                    colSpan ? `col-span-${colSpan}` : 'col-span-1',
                    colSpanMd && `md:col-span-${colSpanMd}`,
                    colSpanLg && `lg:col-span-${colSpanLg}`,
                    colSpanXl && `xl:col-span-${colSpanXl}`,
                  )}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: (i % 4) * 0.05 }}
                >
                  {item.type === 'card' && (
                    <div className="dark:border border-border bg-background dark:bg-card p-6 md:p-8 xl:p-12 2xl:p-16 shadow-sm hover:shadow-lg space-y-4 md:space-y-8">
                      {item.cardTitle && (
                        <h3
                          className={cn(
                            titleSizeMap[cardTitleSize],
                            'font-semibold tracking-tight',
                          )}
                        >
                          {item.cardTitle}
                        </h3>
                      )}
                      {item.cardDescription && (
                        <RichText
                          data={item.cardDescription}
                          className={cn(
                            'mt-2 text-muted-foreground',
                            descriptionSizeMap[cardDescriptionSize],
                          )}
                          enableGutter={false}
                          enableProse={false}
                        >
                          {/* {item.cardDescription} */}
                        </RichText>
                      )}
                      {item.link && (
                        <div className="mt-4">
                          <CMSLink {...item.link} />
                        </div>
                      )}
                    </div>
                  )}

                  {item.type === 'media' && item.media && (
                    <div className="rounded-xl overflow-hidden border border-border bg-card">
                      <Media resource={item.media} imgClassName="object-cover w-full h-full" />
                    </div>
                  )}

                  {item.type === 'slider' && (
                    <div className="rounded-xl overflow-hidden border border-border bg-card">
                      {Array.isArray(item.slides) && item.slides.length > 1 ? (
                        <Swiper
                          modules={[Autoplay, A11y]}
                          autoplay={{ delay: 4000, disableOnInteraction: false }}
                          a11y={{
                            prevSlideMessage: 'Previous slide',
                            nextSlideMessage: 'Next slide',
                          }}
                        >
                          {item.slides.map((s, si) => (
                            <SwiperSlide key={si}>
                              {s.media && (
                                <Media
                                  resource={s.media}
                                  imgClassName="object-cover w-full h-full"
                                />
                              )}
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        <>
                          {item.slides?.[0]?.media && (
                            <Media
                              resource={item.slides[0].media}
                              imgClassName="object-cover w-full h-full"
                            />
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {item.type === 'text' && item.richText && (
                    <div className="rounded-xl border border-border bg-card p-5">
                      <RichText data={item.richText} enableGutter={false} />
                    </div>
                  )}

                  {item.type === 'stat' && (
                    <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-start">
                      <div className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        {item.value}
                      </div>
                      <div className="mt-1 text-sm md:text-base text-muted-foreground">
                        {item.label}
                      </div>
                    </div>
                  )}

                  {item.type === 'testimonial' && (
                    <div className="rounded-xl border border-border bg-card p-6">
                      {item.quote && <p className="text-base md:text-lg italic">{item.quote}</p>}
                      {(item.author || item.role) && (
                        <div className="mt-4 text-sm text-muted-foreground">
                          {item.author}
                          {item.role ? ` — ${item.role}` : ''}
                        </div>
                      )}
                    </div>
                  )}

                  {item.type === 'staff' &&
                    (item as any).staff &&
                    typeof (item as any).staff === 'object' && (
                      <div className="w-full">
                        <StaffCard
                          partner={(item as any).staff}
                          // className="h-full"
                          aspectRatio={item.aspectRatio ?? 'aspect-[3/4]'}
                        />
                      </div>
                    )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
