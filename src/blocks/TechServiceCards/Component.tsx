import React from 'react'
import type { TechServiceCardsBlock as TechServiceCardsBlockProps } from '@/payload-types'
import { lucideIcons, LucideIconName } from '@/utilities/lucideIcons'
import Link from 'next/link'

export const TechServiceCardsComponent: React.FC<TechServiceCardsBlockProps & { className?: string }> = ({
  sectionTitle,
  terminalLabel,
  services,
  className,
}) => {
  return (
    <section className={`py-24 bg-[var(--theme-surface-container-low)] ${className || ''}`}>
      <div className="container mx-auto px-4">
        {/* Header Block with Terminal Look */}
        <div className="mb-16 md:mb-24 relative">
          <div className="text-[var(--theme-primary)] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            <span className="w-2 h-2 rounded-full bg-[var(--theme-tertiary)] animate-pulse" />
            {terminalLabel || 'SYS.STATUS_OPERATIONAL'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--theme-on-surface)] to-[var(--theme-on-surface-variant)]" style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em' }}>
            {sectionTitle}
          </h2>
          {/* Accent Line */}
          <div className="absolute -bottom-8 left-0 w-24 h-1 bg-[var(--theme-secondary-container)]" />
        </div>

        {/* Dynamic Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service: any, index: number) => {
            const IconComponent = service.icon ? lucideIcons[service.icon as LucideIconName] : null

            return (
              <div 
                key={index}
                className="group relative flex flex-col p-8 rounded-2xl h-full transition-all duration-500 overflow-hidden bg-[var(--theme-surface-container-highest)]"
                style={{
                  /** No standard borders, uses surface shift. */
                }}
              >
                {/* Background pulse effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#00C9FF] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  {IconComponent && (
                    <div className="w-14 h-14 rounded-xl mb-6 bg-[var(--theme-surface)] border border-[var(--theme-outline-variant)] flex items-center justify-center text-[var(--theme-primary)] shadow-[0px_10px_20px_rgba(0,102,255,0.05)]">
                      <IconComponent size={28} strokeWidth={1.5} />
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-4 text-[var(--theme-on-surface)]" style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
                    {service.title}
                  </h3>
                  
                  <p className="text-[var(--theme-on-surface-variant)] mb-8 flex-1 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.technicalSpecs?.map((spec: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-[var(--theme-on-surface-variant)]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        <span className="w-4 h-[1px] bg-[var(--theme-primary)]" />
                        {spec.spec}
                      </div>
                    ))}
                  </div>

                  <Link href={service.linkUrl || '#'} className="inline-flex items-center gap-2 text-[var(--theme-tertiary)] font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                    Explore Configuration
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
