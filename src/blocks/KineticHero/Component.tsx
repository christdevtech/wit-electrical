import React from 'react'
import type { KineticHeroBlock as KineticHeroBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const KineticHeroComponent: React.FC<KineticHeroBlockProps & { className?: string }> = ({
  headline,
  subheadline,
  links,
  floatingGlassCard,
  heroImage,

  className,
}) => {
  return (
    <section
      className={`relative overflow-hidden w-full py-20 lg:py-32 bg-[var(--theme-surface)] ${className || ''}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Asymmetrical layout */}
          <div className="relative z-20 flex flex-col items-start pt-8">
            <h1
              className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--theme-on-surface)]"
              style={{
                fontFamily: 'var(--font-plus-jakarta)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {headline}
            </h1>

            {subheadline && (
              <div
                className="mt-6 text-lg lg:text-xl text-[var(--theme-on-surface-variant)] max-w-xl"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <RichText data={subheadline} enableGutter={false} />
              </div>
            )}

            {links && links.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {links.map((linkObj: any, i: number) => (
                  <CMSLink
                    key={i}
                    {...linkObj.link}
                    className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                      i === 0
                        ? 'bg-[var(--theme-primary-container)] text-[var(--theme-on-primary-container)] rounded-tr-[5px] rounded-br-[25px]' // Slanted right edge vibe
                        : 'bg-white/5 backdrop-blur-md border border-[var(--theme-outline-variant)] text-[var(--theme-on-surface)] hover:bg-white/10'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Media & Glass Card side */}
          <div
            className="relative z-10 w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden mt-8 lg:mt-0"
            style={{ clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)' }}
          >
            {heroImage && typeof heroImage !== 'string' && (
              <Media resource={heroImage} fill className="object-cover w-full h-full" priority />
            )}

            {/* Overlay gradient to tie image to the background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-surface)] via-transparent to-[var(--theme-surface)] opacity-80" />

            {/* Floating Glass Card overlapping */}
            {floatingGlassCard?.title && (
              <div
                className="absolute bottom-10 left-[-2rem] md:left-10 p-6 rounded-2xl border border-white/10"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0px 20px 40px rgba(0, 102, 255, 0.15)',
                  maxWidth: '300px',
                }}
              >
                <div
                  className="text-[var(--theme-primary)] text-sm font-bold uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {floatingGlassCard.title}
                </div>
                {floatingGlassCard.stats && (
                  <div
                    className="text-3xl font-bold text-[var(--theme-on-surface)]"
                    style={{ fontFamily: 'var(--font-plus-jakarta)' }}
                  >
                    {floatingGlassCard.stats}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conductive Glow backlights */}
      <div
        className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: 'var(--theme-primary-container)' }}
      />
      <div
        className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: 'var(--theme-tertiary-container)' }}
      />
    </section>
  )
}
