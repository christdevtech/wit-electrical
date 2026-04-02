import React from 'react'
import type { ProcessStepsBlock as ProcessStepsBlockProps } from '@/payload-types'
import { lucideIcons, LucideIconName } from '@/utilities/lucideIcons'

export const ProcessStepsComponent: React.FC<
  ProcessStepsBlockProps & { className?: string }
> = ({ title, description, steps, className }) => {
  return (
    <section className={`py-20 lg:py-32 bg-[var(--theme-surface)] overflow-hidden ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <h2
            className="text-4xl md:text-5xl font-bold text-[var(--theme-on-surface)]"
            style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em' }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="mt-6 text-lg text-[var(--theme-on-surface-variant)]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {description}
            </p>
          )}
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connector Line Base */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[var(--theme-outline-variant)] -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {steps?.map((step: any, i: number) => {
              const IconComponent = step.icon ? lucideIcons[step.icon as LucideIconName] : null
              const isEven = i % 2 === 0

              return (
                <div key={i} className={`relative flex flex-col items-center text-center ${isEven ? 'md:-translate-y-8' : 'md:translate-y-8'}`}>
                  
                  {/* Timeline point connecting to the line */}
                  <div className={`hidden md:block absolute w-[2px] bg-[var(--theme-outline-variant)] left-1/2 -translate-x-1/2 ${isEven ? 'bottom-[-60px] h-16' : 'top-[-60px] h-16'}`} />
                  
                  {/* Floating Step Card */}
                  <div className="z-10 group bg-[var(--theme-surface-container)] rounded-3xl p-8 border border-[var(--theme-outline-variant)]/50 transition-transform duration-500 hover:-translate-y-2 relative overflow-hidden">
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="flex flex-col items-center">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-full bg-[var(--theme-surface-container-highest)] border border-[var(--theme-outline-variant)] flex items-center justify-center text-[var(--theme-primary)]">
                          {IconComponent && <IconComponent size={28} />}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[var(--theme-primary)] text-[var(--theme-on-primary)] flex items-center justify-center text-sm font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                          0{i + 1}
                        </div>
                      </div>

                      <h3
                        className="text-xl font-bold mb-4 text-[var(--theme-on-surface)]"
                        style={{ fontFamily: 'var(--font-plus-jakarta)' }}
                      >
                        {step.title}
                      </h3>
                      
                      <p
                        className="text-sm text-[var(--theme-on-surface-variant)] leading-relaxed"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {step.description}
                      </p>
                    </div>
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
