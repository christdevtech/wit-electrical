'use client'

import React from 'react'
import type { LogoShowcaseBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { BlockWrapper } from '@/components/BlockWrapper'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & LogoShowcaseBlock

export const LogoShowcaseBlockComponent: React.FC<Props> = ({
  className,
  title,
  logos,
  animationSpeed = 20,
  threshold = 4,
  backgroundVariant,
  colorTheme,
  backgroundImage,
  blockId,
}) => {
  const shouldAnimate = logos && logos.length >= (threshold || 4)
  
  // Double the logos for smoother infinite scrolling if animating
  const displayLogos = shouldAnimate ? [...(logos || []), ...(logos || [])] : logos

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      blockId={blockId}
      className={cn(className, "overflow-hidden")}
    >
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-center text-2xl font-semibold mb-8 text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            {title}
          </h2>
        )}

        <div className={cn("relative mx-auto", shouldAnimate ? "w-full max-w-full" : "max-w-6xl")}>
          {shouldAnimate && (
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          )}
          {shouldAnimate && (
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          )}

          <div 
            className={cn(
              "flex items-center gap-12",
              shouldAnimate ? "animate-scroll" : "justify-center flex-wrap"
            )}
            style={{
              // @ts-expect-error custom property for animation speed
              '--animation-duration': `${animationSpeed}s`,
              width: shouldAnimate ? 'max-content' : 'auto',
            }}
          >
            {displayLogos?.map((item, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              >
                 {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="block relative h-16 w-32 md:h-20 md:w-40">
                     {item.logo && typeof item.logo !== 'string' && (
                        <Media resource={item.logo} className="object-contain w-full h-full" imgClassName="object-contain w-full h-full" /> 
                      )}
                  </a>
                 ) : (
                  <div className="relative h-16 w-32 md:h-20 md:w-40 select-none">
                     {item.logo && typeof item.logo !== 'string' && (
                        <Media resource={item.logo} className="object-contain w-full h-full" imgClassName="object-contain w-full h-full" />
                      )}
                  </div>
                 )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}
