import React from 'react'
import RichText from '@/components/RichText'
import { SwiperWithSideTextBlock } from '@/payload-types'
import { SwiperClient } from './SwiperClient'
import { BlockWrapper } from '@/components/BlockWrapper'

type Props = SwiperWithSideTextBlock & {
  className?: string
  backgroundVariant?: 'color' | 'image'
  colorTheme?: string | null
  backgroundImage?: any
  imageTextColor?: 'white' | 'black' | null
  blockId?: string | null
}

export const SwiperWithSideContent: React.FC<Props> = (props) => {
  const { slides, title, description, className, backgroundVariant, colorTheme, backgroundImage, imageTextColor, blockId } = props

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      imageTextColor={imageTextColor}
      blockId={blockId}
      className={className}
    >
      <div className="container py-16 space-y-6">
        {title && <h2 className="text-4xl text-center">{title}</h2>}
        {description && (
          <RichText enableGutter={false} data={description} className="text-xl text-center mb-4" />
        )}
        <SwiperClient slides={slides} />
      </div>
    </BlockWrapper>
  )
}
