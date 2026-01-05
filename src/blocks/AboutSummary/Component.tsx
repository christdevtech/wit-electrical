'use client'
import React from 'react'
import { motion } from 'framer-motion'

import type { AboutSummaryBlock as AboutSummaryProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { BlockWrapper } from '@/components/BlockWrapper'

type Props = AboutSummaryProps & {
  id?: string
  className?: string
  backgroundVariant?: 'color' | 'image'
  colorTheme?: string | null
  backgroundImage?: any
  blockId?: string | null
}

export const AboutSummaryBlock: React.FC<Props> = (props) => {
  const {
    id,
    className,
    backgroundVariant,
    colorTheme,
    backgroundImage,
    blockId,
    content,
    media,
    imagePosition = 'right',
    enableLink,
    link,
    title,
  } = props

  const hasImage = Boolean(media)
  const isRight = imagePosition === 'right'

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      blockId={blockId ?? id}
      className={className}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('grid gap-8 items-center', {
            'lg:grid-cols-2': hasImage,
          })}
        >
          <div
            className={cn('order-1', {
              'lg:order-1': !hasImage || !isRight,
              'lg:order-2': hasImage && isRight,
            })}
          >
            {title && (
              <h2 className="text-3xl font-bold text-primary mb-4 pl-4 border-l-2 border-primary">
                {title}
              </h2>
            )}
            {content && <RichText data={content} enableGutter={false} />}
            {enableLink && link && (
              <div className="mt-4">
                <CMSLink {...link} appearance="default" />
              </div>
            )}
          </div>
          {hasImage && (
            <div
              className={cn(
                'order-2',
                { 'lg:order-1': isRight },
                'overflow-hidden relative rounded-xl hover:rounded-2xl',
              )}
            >
              {typeof media === 'object' && (
                <Media
                  resource={media}
                  className="w-full rounded-lg shadow-md hover:transform hover:scale-105 transition-transform duration-300"
                  imgClassName="object-cover"
                />
              )}
            </div>
          )}
        </motion.div>
      </div>
    </BlockWrapper>
  )
}
