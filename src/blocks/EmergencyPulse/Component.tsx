import React from 'react'
import type { EmergencyPulseBlock as EmergencyPulseBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const EmergencyPulseComponent: React.FC<
  EmergencyPulseBlockProps & { className?: string }
> = ({ pulseLabel, title, text, links, className }) => {
  return (
    <section
      className={`py-12 md:py-20 bg-[var(--theme-surface)] relative overflow-hidden ${className || ''}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div
          className="rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 border border-[var(--theme-outline-variant)]/20"
          style={{
            background: 'var(--theme-surface-container-low)',
            boxShadow: '0px 20px 40px rgba(0, 102, 255, 0.10)',
          }}
        >
          {/* Subtle glow behind the card */}
          <div className="absolute inset-0 bg-[var(--theme-primary)]/5 blur-3xl -z-10 rounded-full w-full h-full transform scale-150" />

          <div className="flex-1 max-w-2xl">
            {pulseLabel && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-tertiary)]/10 border border-[var(--theme-tertiary)]/20 text-[var(--theme-tertiary)] text-xs font-bold uppercase tracking-wider mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--theme-tertiary)] animate-pulse shadow-[0_0_8px_var(--theme-tertiary)]" />
                {pulseLabel}
              </div>
            )}

            <h2
              className="text-3xl md:text-5xl font-bold text-[var(--theme-on-surface)] mb-4"
              style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em' }}
            >
              {title}
            </h2>

            {text && (
              <p
                className="text-lg text-[var(--theme-on-surface-variant)]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {text}
              </p>
            )}
          </div>

          {links && links.length > 0 && (
            <div className="shrink-0 flex items-center gap-4">
              {links.map((linkObj: any, i: number) => (
                <CMSLink
                  key={i}
                  {...linkObj.link}
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                    i === 0
                      ? 'bg-[var(--theme-primary-container)] text-[var(--theme-on-primary-container)] rounded-tl-[5px] rounded-br-[25px]'
                      : 'bg-transparent border border-[var(--theme-outline)] text-[var(--theme-on-surface)] hover:bg-[var(--theme-on-surface)]/5'
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
