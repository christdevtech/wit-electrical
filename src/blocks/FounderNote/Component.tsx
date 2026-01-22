'use client'

import React from 'react'
import type { FounderNoteBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { BlockWrapper } from '@/components/BlockWrapper'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

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
  imagePosition = 'left',
  backgroundVariant,
  colorTheme,
  backgroundImage,
  blockId,
}) => {
  const isImageLeft = imagePosition === 'left'

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mb-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
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

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-6xl mx-auto"
        >
          <div
            className={cn(
              'relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30',
              'border-2 border-transparent',
              'shadow-2xl hover:shadow-3xl transition-all duration-500',
              'backdrop-blur-sm',
              // Gradient border effect
              'before:absolute before:inset-0 before:-z-10 before:rounded-3xl',
              'before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500',
              'before:p-[2px] before:content-[""]',
            )}
          >
            {/* Background Decorative Elements */}
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-purple-400/10 blur-3xl" />

            <div
              className={cn(
                'relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12',
                isImageLeft ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense',
              )}
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: isImageLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={cn('relative', !isImageLeft && 'lg:col-start-2')}
              >
                <div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl shadow-xl">
                  {/* Quote icon decoration */}
                  <div className="absolute top-4 left-4 z-10 p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg">
                    <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  {founderPhoto && typeof founderPhoto !== 'string' && (
                    <Media
                      resource={founderPhoto}
                      className="h-full w-full object-cover"
                      imgClassName="h-full w-full object-cover"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: isImageLeft ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={cn(
                  'flex flex-col justify-center',
                  isImageLeft ? 'lg:col-start-2' : 'lg:col-start-1',
                )}
              >
                {/* Name and Position */}
                <div className="mb-6">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {founderName}
                  </h3>
                  <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    {founderPosition}
                  </p>
                </div>

                {/* Message */}
                <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
                  <div className="text-gray-700 dark:text-gray-300">
                    <RichText data={founderMessage} enableGutter={false} />
                  </div>
                </div>

                {/* Signature */}
                {signatureImage && typeof signatureImage !== 'string' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-4"
                  >
                    <Media
                      resource={signatureImage}
                      className="h-16 w-auto grayscale opacity-60 dark:invert"
                      imgClassName="h-16 w-auto object-contain object-left"
                    />
                  </motion.div>
                )}

                {/* Decorative accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </BlockWrapper>
  )
}
