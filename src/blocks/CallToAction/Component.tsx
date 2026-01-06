import React from 'react'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { BlockWrapper } from '@/components/BlockWrapper'

type Props = CTABlockProps & {
  className?: string
  backgroundVariant?: 'color' | 'image'
  colorTheme?: string | null
  backgroundImage?: any
  imageTextColor?: 'white' | 'black' | null
  blockId?: string | null
}

export const CallToActionBlock: React.FC<Props> = ({
  links,
  richText,
  className,
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
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
          <div className="max-w-[48rem] flex items-center">
            {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          </div>
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
