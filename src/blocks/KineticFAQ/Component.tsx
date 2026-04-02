import React from 'react'
import type { KineticFAQBlock as KineticFAQBlockProps } from '@/payload-types'
import { Plus } from 'lucide-react'

export const KineticFAQComponent: React.FC<
  KineticFAQBlockProps & { className?: string }
> = ({ title, faqs, className }) => {
  return (
    <section className={`py-20 lg:py-32 bg-[var(--theme-surface-container-low)] ${className || ''}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2
          className="text-3xl md:text-5xl font-bold text-center mb-16 text-[var(--theme-on-surface)]"
          style={{ fontFamily: 'var(--font-plus-jakarta)', letterSpacing: '-0.02em' }}
        >
          {title}
        </h2>

        <div className="space-y-4">
          {faqs?.map((faq: any, i: number) => (
            <details
              key={i}
              className="group rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-outline-variant)]/50 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                <span
                  className="font-bold text-lg md:text-xl text-[var(--theme-on-surface)] pr-8"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {faq.question}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--theme-surface-container-high)] flex items-center justify-center text-[var(--theme-on-surface)] group-open:rotate-45 transition-transform duration-300">
                  <Plus size={20} />
                </span>
              </summary>
              <div 
                className="px-6 pb-6 text-[var(--theme-on-surface-variant)] text-lg" 
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <div className="pt-2 border-t border-[var(--theme-outline-variant)]/30 mt-2">
                  {faq.answer}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
      
      {/* Required for ensuring details-marker is hidden globally if standard css didn't do it */}
      <style dangerouslySetInnerHTML={{__html: `details > summary::-webkit-details-marker { display: none; }`}} />
    </section>
  )
}
