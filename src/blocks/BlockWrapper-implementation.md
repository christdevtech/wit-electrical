# BlockWrapper Implementation Guide

This guide explains how BlockWrapper is implemented across block configs, block components, and the renderer, and how to replicate it in another Payload CMS + Next.js installation.

## Overview

- BlockWrapper provides a unified background API for blocks:
  - Supports either a color gradient theme or a background image.
  - Adds an optional blockId for anchor linking.
- Blocks declare the background settings in their config via shared fields and use BlockWrapper in their component to render the background consistently.
- The page-level renderer maps Payload block types to React components; each component handles its own BlockWrapper.

## Key Files

- Component: [BlockWrapper](file:///c:/Users/MICHAEL/Documents/GitHub/kinsmen-advocates-law-firm/src/components/BlockWrapper/index.tsx)
- Background themes: [background.ts](file:///c:/Users/MICHAEL/Documents/GitHub/kinsmen-advocates-law-firm/src/utilities/background.ts)
- Shared block fields: [blockFields.ts](file:///c:/Users/MICHAEL/Documents/GitHub/kinsmen-advocates-law-firm/src/fields/blockFields.ts)
- Renderer: [RenderBlocks.tsx](file:///c:/Users/MICHAEL/Documents/GitHub/kinsmen-advocates-law-firm/src/blocks/RenderBlocks.tsx)
- Example configs:
  - [MediaBlock/config.ts](file:///c:/Users/MICHAEL/Documents/GitHub/kinsmen-advocates-law-firm/src/blocks/MediaBlock/config.ts)
  - [LogoShowcase/config.ts](file:///c:/Users/MICHAEL/Documents/GitHub/kinsmen-advocates-law-firm/src/blocks/LogoShowcase/config.ts)
- Example components:
  - [Content/Component.tsx](file:///c:/Users/MICHAEL/Documents/GitHub/kinsmen-advocates-law-firm/src/blocks/Content/Component.tsx)
  - [MediaBlock/Component.tsx](file:///c:/Users/MICHAEL/Documents/GitHub/kinsmen-advocates-law-firm/src/blocks/MediaBlock/Component.tsx)

## Component: BlockWrapper

```tsx
import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { gradientByTheme } from '@/utilities/background'

type Props = {
  backgroundVariant?: 'color' | 'image'
  colorTheme?: string | null
  backgroundImage?: any
  blockId?: string | null
  className?: string
  children: React.ReactNode
}

export const BlockWrapper: React.FC<Props> = ({
  backgroundVariant,
  colorTheme,
  backgroundImage,
  blockId,
  className,
  children,
}) => {
  const bgClass = backgroundVariant === 'color' ? gradientByTheme[colorTheme || 'default'] : ''

  return (
    <div
      className={cn(bgClass, 'relative overflow-hidden', className)}
      id={blockId ? `block-${blockId}` : undefined}
    >
      {backgroundVariant === 'image' && backgroundImage && typeof backgroundImage === 'object' && (
        <>
          <Media fill imgClassName="-z-10 object-cover" resource={backgroundImage} />
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
        </>
      )}
      {children}
    </div>
  )
}
```

### Background Themes

```ts
export const gradientByTheme: Record<string, string> = {
  slate: 'bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900',
  gray: 'bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
  zinc: 'bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900',
  neutral:
    'bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900',
  stone: 'bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900',
  blue: 'bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-800 dark:to-blue-900',
  indigo: 'bg-gradient-to-b from-indigo-50 to-indigo-100 dark:from-indigo-800 dark:to-indigo-900',
  violet: 'bg-gradient-to-b from-violet-50 to-violet-100 dark:from-violet-800 dark:to-violet-900',
  emerald:
    'bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-800 dark:to-emerald-900',
  teal: 'bg-gradient-to-b from-teal-50 to-teal-100 dark:from-teal-800 dark:to-teal-900',
  rose: 'bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-800 dark:to-rose-900',
  default: '',
}
```

## Shared Config Fields

```ts
import type { Field } from 'payload'

export const backgroundField: Field = {
  type: 'row',
  fields: [
    {
      name: 'backgroundVariant',
      type: 'select',
      options: [
        { label: 'Color theme', value: 'color' },
        { label: 'Background image', value: 'image' },
      ],
      defaultValue: 'color',
      required: true,
    },
    {
      name: 'colorTheme',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundVariant === 'color',
        width: '50%',
      },
      options: [
        { label: 'Slate', value: 'slate' },
        { label: 'Gray', value: 'gray' },
        { label: 'Zinc', value: 'zinc' },
        { label: 'Neutral', value: 'neutral' },
        { label: 'Stone', value: 'stone' },
        { label: 'Blue', value: 'blue' },
        { label: 'Indigo', value: 'indigo' },
        { label: 'Violet', value: 'violet' },
        { label: 'Emerald', value: 'emerald' },
        { label: 'Teal', value: 'teal' },
        { label: 'Rose', value: 'rose' },
        { label: 'Default', value: 'default' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundVariant === 'image',
        width: '50%',
      },
    },
  ],
}

export const blockIdField: Field = {
  name: 'blockId',
  label: 'Block ID (for navigation)',
  type: 'text',
  admin: {
    description: 'Enter a unique ID for this block to link to it (e.g., \"about-us\").',
  },
}
```

## Example Block Config

```ts
import type { Block } from 'payload'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
```

## Example Block Component

```tsx
import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { BlockWrapper } from '@/components/BlockWrapper'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  backgroundVariant?: 'color' | 'image'
  colorTheme?: string
  backgroundImage?: any
  blockId?: string
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    backgroundVariant,
    colorTheme,
    backgroundImage,
    blockId,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      blockId={blockId}
      className={className}
    >
      <div
        className={cn('', {
          container: enableGutter,
        })}
      >
        {(media || staticImage) && (
          <Media
            imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
            resource={media}
            src={staticImage}
          />
        )}
        {caption && (
          <div
            className={cn(
              'mt-6',
              {
                container: !disableInnerContainer,
              },
              captionClassName,
            )}
          >
            <RichText data={caption} enableGutter={false} />
          </div>
        )}
      </div>
    </BlockWrapper>
  )
}
```

## Renderer Integration

```tsx
import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { GridBlock } from '@/blocks/Grid/Component'
import ServicesCarouselBlock from '@/blocks/ServicesCarousel/Component'
import { LogoShowcaseBlock } from '@/blocks/LogoShowcase/Component'
import { MissionVisionBlockComponent } from '@/blocks/MissionVision/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  grid: GridBlock,
  servicesCarousel: ServicesCarouselBlock,
  logoShowcase: LogoShowcaseBlock,
  missionVision: MissionVisionBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (Block) {
              return <Block {...block} className="py-8 md:py-10 lg:py-12 xl:py-16" key={index} />
            }
          }
          return null
        })}
      </Fragment>
    )
  }
  return null
}
```

## Replication Steps

- Add BlockWrapper component and background utilities to your project.
- Create shared fields file with `backgroundField` and `blockIdField`.
- In each block config, include `backgroundField` and `blockIdField`.
- In each block component, wrap content with BlockWrapper and pass `backgroundVariant`, `colorTheme`, `backgroundImage`, and `blockId` from props.
- Ensure your renderer maps Payload block types to the corresponding React components; each component handles its own BlockWrapper.
