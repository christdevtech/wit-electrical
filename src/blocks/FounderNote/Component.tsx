'use client'

import React from 'react'
import type { FounderNoteBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { BlockWrapper } from '@/components/BlockWrapper'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

type Props = {
  className?: string
} & FounderNoteBlock

export const FounderNoteBlockComponent: React.FC<Props> = ({
  className,
  sectionTitle,
  sectionDescription,
  founderPhoto,
  founderName,
  founderPosition,
  founderMessage,
  signatureImage,
  imagePosition = 'right',
  backgroundVariant,
  colorTheme,
  backgroundImage,
  blockId,
}) => {
  const isImageRight = imagePosition === 'right'

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      blockId={blockId}
      className={className}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        {(sectionTitle || sectionDescription) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            {sectionTitle && (
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </motion.div>
        )}

        {/* Founder Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-7xl mx-auto"
        >
          <div
            className={cn(
              'grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl',
              'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
              isImageRight ? '' : 'lg:grid-flow-dense',
            )}
          >
            {/* Quote/Message Section - Dark Navy Background */}
            <motion.div
              initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={cn(
                'relative p-8 md:p-12 lg:p-16 flex flex-col justify-center',
                'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
                'order-2 lg:order-1',
                !isImageRight && 'lg:col-start-2 lg:order-2',
              )}
            >
              {/* Large Quote Mark */}
              <div className="mb-6">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 text-blue-400/40"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
                </svg>
              </div>

              {/* Message/Quote */}
              <div className="prose prose-lg prose-invert max-w-none mb-8">
                <div className="text-white/90 text-lg md:text-xl leading-relaxed">
                  <RichText data={founderMessage} enableGutter={false} />
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Signature */}
              {signatureImage && typeof signatureImage !== 'string' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Media
                    resource={signatureImage}
                    className="h-12 w-auto opacity-80 invert"
                    imgClassName="h-12 w-auto object-contain object-left"
                  />
                </motion.div>
              ) : (
                <p className="text-xl md:text-2xl font-serif italic text-white/80">{founderName}</p>
              )}
            </motion.div>

            {/* Image Section with Glassmorphism Overlay */}
            <motion.div
              initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={cn(
                'relative min-h-[400px] lg:min-h-[600px]',
                'order-1 lg:order-2',
                isImageRight ? 'lg:col-start-2' : 'lg:col-start-1 lg:order-1',
              )}
            >
              {/* Photo */}
              {founderPhoto && typeof founderPhoto !== 'string' && (
                <Media
                  resource={founderPhoto}
                  className="absolute inset-0 h-full w-full object-cover"
                  imgClassName="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Glassmorphism Name Card - Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12"
              >
                <div
                  className={cn(
                    'backdrop-blur-md bg-white/10 dark:bg-black/20',
                    'border border-white/20',
                    'rounded-2xl p-6 md:p-8',
                    'shadow-2xl',
                  )}
                >
                  {/* Label */}
                  <p className="text-xs md:text-sm font-semibold tracking-widest text-white/70 uppercase mb-2">
                    {founderPosition}
                  </p>

                  {/* Name */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                    {founderName}
                  </h3>

                  {/* Optional subtitle/motto from position */}
                  {/* You could add another field for this if needed */}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </BlockWrapper>
  )
}
