import React from 'react'
import type { KineticCTABlock as KineticCTABlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const KineticCTAComponent: React.FC<KineticCTABlockProps & { className?: string }> = ({
  headline,
  description,
  links,
  className,
}) => {
  return (
    <section
      className={`py-24 relative overflow-hidden bg-[var(--theme-surface)] ${className || ''}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div
          className="max-w-5xl mx-auto rounded-3xl p-10 md:p-20 text-center relative border border-[var(--theme-primary)]/20 overflow-hidden"
          style={{
            background: 'var(--theme-surface-container-high)',
            boxShadow: '0 25px 50px -12px rgba(0, 102, 255, 0.15)',
          }}
        >
          {/* Animated Background Gradients inside the card */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--theme-primary-container)] rounded-full blur-[100px] opacity-20 -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--theme-tertiary-container)] rounded-full blur-[100px] opacity-20 -z-10" />

          {/* Decorative circuit lines */}
          <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-[var(--theme-outline-variant)]/50 rounded-tl-3xl hidden md:block" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-[var(--theme-outline-variant)]/50 rounded-br-3xl hidden md:block" />

          <h2
            className="text-4xl md:text-6xl font-bold mb-6 text-[var(--theme-on-surface)] max-w-3xl mx-auto leading-tight relative"
            style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em' }}
          >
            {headline}
          </h2>

          {description && (
            <p
              className="text-lg md:text-xl text-[var(--theme-on-surface-variant)] mb-12 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {description}
            </p>
          )}

          {links && links.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              {links.map((linkObj: any, i: number) => (
                <CMSLink
                  key={i}
                  {...linkObj.link}
                  className={`inline-flex items-center justify-center px-10 py-5 rounded-xl font-bold transition-all duration-300 text-lg ${
                    i === 0
                      ? 'bg-[var(--theme-primary)] text-[var(--theme-on-primary)] hover:bg-[var(--theme-primary)]/90 hover:scale-105 shadow-[0_10px_20px_rgba(0,102,255,0.3)]'
                      : 'bg-[var(--theme-surface)] border-2 border-[var(--theme-outline-variant)] text-[var(--theme-on-surface)] hover:bg-[var(--theme-surface-container-highest)]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
