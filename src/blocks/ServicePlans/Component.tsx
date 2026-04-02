import React from 'react'
import type { ServicePlansBlock as ServicePlansBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Check } from 'lucide-react'

export const ServicePlansComponent: React.FC<
  ServicePlansBlockProps & { className?: string }
> = ({ title, subtitle, plans, className }) => {
  return (
    <section className={`py-20 lg:py-32 bg-[var(--theme-surface)] ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2
            className="text-4xl md:text-5xl font-bold text-[var(--theme-on-surface)]"
            style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em' }}
          >
            {title}
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

        <div className={`grid grid-cols-1 md:grid-cols-2 ${plans && plans.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8 items-stretch max-w-6xl mx-auto`}>
          {plans?.map((plan: any, i: number) => {
            const isPopular = plan.isPopular
            return (
              <div
                key={i}
                className={`flex flex-col relative rounded-3xl p-8 md:p-10 transition-transform hover:-translate-y-2 duration-300 ${
                  isPopular
                    ? 'bg-[var(--theme-surface-container-high)] border-2 border-[var(--theme-primary)] shadow-[0_20px_40px_rgba(0,102,255,0.15)] relative z-10'
                    : 'bg-[var(--theme-surface-container-low)] border border-[var(--theme-outline-variant)]'
                }`}
              >
                {/* Glow ring if popular */}
                {isPopular && (
                  <div className="absolute inset-0 bg-[var(--theme-primary)]/5 blur-xl -z-10 rounded-full" />
                )}

                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--theme-primary)] text-[var(--theme-on-primary)] rounded-full">
                    Recommended
                  </div>
                )}

                <h3
                  className="text-2xl font-bold mb-2 text-[var(--theme-on-surface)]"
                  style={{ fontFamily: 'var(--font-plus-jakarta)' }}
                >
                  {plan.name}
                </h3>
                
                {plan.description && (
                  <p className="text-sm text-[var(--theme-on-surface-variant)] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                    {plan.description}
                  </p>
                )}

                {plan.price && (
                  <div className="mb-8 pb-8 border-b border-[var(--theme-outline-variant)]">
                    <span className="text-4xl font-bold text-[var(--theme-on-surface)]">{plan.price}</span>
                  </div>
                )}

                <ul className="flex-1 space-y-4 mb-10">
                  {plan.features?.map((f: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 text-[var(--theme-on-surface)]" style={{ fontFamily: 'var(--font-inter)' }}>
                      <Check className="w-5 h-5 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                      <span>{f.feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.actionLink && (
                  <div className="mt-auto">
                    <CMSLink
                      {...plan.actionLink}
                      className={`w-full text-center block px-6 py-4 rounded-xl font-bold transition-colors ${
                        isPopular
                          ? 'bg-[var(--theme-primary)] text-[var(--theme-on-primary)] hover:bg-[var(--theme-primary)]/90'
                          : 'bg-[var(--theme-surface-container-highest)] text-[var(--theme-on-surface)] hover:bg-[var(--theme-surface-container-highest)]/80'
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
