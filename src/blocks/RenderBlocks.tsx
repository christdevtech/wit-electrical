import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SwiperWithSideContent } from './SwiperWithSideText/Component'
import { TestimonialsBlock } from './Testimonials/Component'
import { AboutSummaryBlock } from '@/blocks/AboutSummary/Component'
import { GridBlock } from '@/blocks/Grid/Component'
import { ContactBlock as ContactBlockComponent } from '@/blocks/ContactBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  swiperWithSideText: SwiperWithSideContent,
  testimonials: TestimonialsBlock,
  aboutSummary: AboutSummaryBlock,
  grid: GridBlock,
  contactBlock: ContactBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                // @ts-expect-error there may be some mismatch between the expected types here
                <Block {...block} className="py-8 md:py-10 lg:py-12 xl:py-16" key={index} />
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
