import React from 'react'
import type { FeaturesChecklistBlock as FeaturesChecklistBlockProps } from '@/payload-types'
import { lucideIcons, LucideIconName } from '@/utilities/lucideIcons'

export const FeaturesChecklistComponent: React.FC<FeaturesChecklistBlockProps & { className?: string }> = ({
  title,
  content,
  checklist,
  className,
}) => {
  return (
    <section className={`py-20 lg:py-32 bg-[var(--theme-surface)] ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Title Area (Asymmetrical Layout) */}
          <div className="lg:col-span-5 sticky top-24">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[var(--theme-on-surface)] to-[var(--theme-outline)]" style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            {content && (
              <p className="mt-6 text-lg text-[var(--theme-on-surface-variant)] leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                {content}
              </p>
            )}
            
            {/* The Circuit Navigator line graphic */}
            <div className="mt-12 hidden lg:flex items-center">
              <div className="w-3 h-3 rounded-full bg-[var(--theme-secondary-fixed)]" />
              <div className="h-[1px] w-64 bg-gradient-to-r from-[var(--theme-secondary-fixed)] to-transparent opacity-30" />
            </div>
          </div>

          {/* Staggered Checklist */}
          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 mt-10 lg:mt-0">
            {checklist?.map((item: any, index: number) => {
              const IconComponent = item.icon ? lucideIcons[item.icon as LucideIconName] : null
              const isEven = index % 2 === 0
              
              return (
                <div 
                  key={index}
                  className={`flex flex-col sm:flex-row gap-6 p-8 rounded-3xl bg-[var(--theme-surface-container-high)] ${isEven ? 'lg:mr-12' : 'lg:ml-12'}`}
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
                  }}
                >
                  <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--theme-surface-container-lowest)] border border-[var(--theme-outline-variant)]/30 text-[var(--theme-primary)]">
                    {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--theme-on-surface)]" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                      {item.title}
                    </h3>
                    <p className="text-[var(--theme-on-surface-variant)] leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
