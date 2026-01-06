import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { gradientByTheme } from '@/utilities/background'

type Props = {
  backgroundVariant?: 'color' | 'image'
  colorTheme?: string | null
  backgroundImage?: any
  imageTextColor?: 'white' | 'black' | null
  blockId?: string | null
  className?: string
  children: React.ReactNode
}

export const BlockWrapper: React.FC<Props> = ({
  backgroundVariant,
  colorTheme,
  backgroundImage,
  imageTextColor,
  blockId,
  className,
  children,
}) => {
  const bgClass = backgroundVariant === 'color' ? gradientByTheme[colorTheme || 'default'] : ''
  const textClass =
    backgroundVariant === 'image'
      ? imageTextColor === 'black'
        ? 'text-black'
        : 'text-white'
      : ''

  return (
    <div
      className={cn(bgClass, textClass, 'relative overflow-hidden', className)}
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
