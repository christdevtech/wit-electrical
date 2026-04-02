import React from 'react'
import type { CompanyStatsBlock as CompanyStatsBlockProps } from '@/payload-types'
import { lucideIcons, LucideIconName } from '@/utilities/lucideIcons'

export const CompanyStatsComponent: React.FC<
  CompanyStatsBlockProps & { className?: string }
> = ({ title, stats, className }) => {
  return (
    <section className={`py-12 md:py-16 bg-[var(--theme-surface-container-lowest)] border-y border-[var(--theme-outline-variant)]/50 ${className || ''}`}>
      <div className="container mx-auto px-4">
        
        {title && (
          <h2 className="text-center text-[var(--theme-primary)] text-sm font-bold uppercase tracking-widest mb-10" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {title}
          </h2>
        )}

        <div className="flex flex-wrap justify-center gap-10 md:gap-20">
          {stats?.map((stat: any, i: number) => {
            const IconComponent = stat.icon ? lucideIcons[stat.icon as LucideIconName] : null

            return (
              <div key={i} className="flex flex-col items-center text-center group">
                {IconComponent && (
                  <div className="text-[var(--theme-tertiary)] mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <IconComponent size={24} strokeWidth={1.5} />
                  </div>
                )}
                
                <div
                  className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[var(--theme-on-surface)] to-[var(--theme-on-surface-variant)] mb-2"
                  style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em', lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                
                <div
                  className="text-sm md:text-base font-bold text-[var(--theme-on-surface-variant)] uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
