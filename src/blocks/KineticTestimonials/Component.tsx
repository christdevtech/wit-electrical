import React from 'react'
import type { KineticTestimonialsBlock as KineticTestimonialsBlockProps } from '@/payload-types'
import { Quote } from 'lucide-react'

export const KineticTestimonialsComponent: React.FC<
  KineticTestimonialsBlockProps & { className?: string }
> = ({ sectionTitle, subtitle, testimonials, className }) => {
  return (
    <section className={`py-20 lg:py-32 bg-[var(--theme-surface)] ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[var(--theme-on-surface)]"
            style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em' }}
          >
            {sectionTitle}
          </h2>
          {subtitle && (
            <p
              className="mt-6 text-lg text-[var(--theme-on-surface-variant)]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial: any, i: number) => (
            <div
              key={i}
              className="group relative p-8 rounded-3xl bg-[var(--theme-surface-container-low)] border border-[var(--theme-outline-variant)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,102,255,0.08)] flex flex-col justify-between"
            >
              {/* Subtle top glow line to match kinetic aesthetic */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[var(--theme-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                <Quote className="text-[var(--theme-primary)] w-8 h-8 mb-6 opacity-80" />
                <p
                  className="text-lg text-[var(--theme-on-surface)] leading-relaxed mb-8 italic"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--theme-surface-container-highest)] border border-[var(--theme-outline-variant)] flex items-center justify-center text-[var(--theme-primary)] font-bold text-lg">
                  {testimonial.authorName.charAt(0)}
                </div>
                <div>
                  <div
                    className="font-bold text-[var(--theme-on-surface)]"
                    style={{ fontFamily: 'var(--font-plus-jakarta)' }}
                  >
                    {testimonial.authorName}
                  </div>
                  <div
                    className="text-sm text-[var(--theme-on-surface-variant)]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {testimonial.authorRole}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
