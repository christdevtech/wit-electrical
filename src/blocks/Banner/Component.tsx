import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { BlockWrapper } from '@/components/BlockWrapper'

type Props = {
  className?: string
  backgroundVariant?: 'color' | 'image'
  colorTheme?: string | null
  backgroundImage?: any
  imageTextColor?: 'white' | 'black' | null
  blockId?: string | null
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({
  className,
  content,
  style,
  backgroundVariant,
  colorTheme,
  backgroundImage,
  imageTextColor,
  blockId,
}) => {
  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      imageTextColor={imageTextColor}
      blockId={blockId}
      className={className}
    >
      <div
        className={cn('container', {
          'py-3': true,
        })}
      >
        <div
          className={cn('border py-3 px-6 flex items-center rounded', {
            'border-border bg-card': style === 'info',
            'border-error bg-error/30': style === 'error',
            'border-success bg-success/30': style === 'success',
            'border-warning bg-warning/30': style === 'warning',
          })}
        >
          <RichText data={content} enableGutter={false} enableProse={false} />
        </div>
      </div>
    </BlockWrapper>
  )
}
