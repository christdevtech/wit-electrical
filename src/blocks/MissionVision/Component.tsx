'use client'

import type { MissionVisionBlock } from '@/payload-types'

import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { easeOut, motion, spring } from 'framer-motion'
import { BlockWrapper } from '@/components/BlockWrapper'

type Props = {
  className?: string
  imageTextColor?: 'white' | 'black' | null
} & MissionVisionBlock

export const MissionVisionBlockComponent: React.FC<Props> = ({
  className,
  missionTitle,
  missionContent,
  missionImage,
  visionTitle,
  visionContent,
  visionImage,
  layout = 'sideBySide',
  missionVisionTitle,
  mainDescription,
  backgroundVariant,
  colorTheme,
  backgroundImage,
  imageTextColor,
  blockId,
}) => {
  const isStacked = layout === 'stacked'
  const isSideBySide = layout === 'sideBySide'

  return (
    <BlockWrapper
      backgroundVariant={backgroundVariant}
      colorTheme={colorTheme}
      backgroundImage={backgroundImage}
      imageTextColor={imageTextColor}
      blockId={blockId}
      className={className}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className={cn('container mx-auto px-4 my-16')}>
          <motion.div
            variants={headerVariants}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mb-12 text-center"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: easeOut }}
              className="mx-auto mb-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 dark:text-white"
            >
              {missionVisionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 text-lg text-gray-600 dark:text-gray-400"
            >
              {mainDescription}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className={cn(
              'grid gap-8',
              isSideBySide ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto',
              isStacked && 'space-y-8',
            )}
          >
            <SectionCard
              title={missionTitle}
              content={missionContent}
              image={missionImage}
              isFirst={true}
            />

            <SectionCard
              title={visionTitle}
              content={visionContent}
              image={visionImage}
              isFirst={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <div className="flex space-x-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 0.3, type: spring, stiffness: 200 }}
                className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"
              />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 0.3, type: spring, stiffness: 200 }}
                className="h-2 w-2 rounded-full bg-purple-400 animate-pulse delay-75"
              />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6, duration: 0.3, type: spring, stiffness: 200 }}
                className="h-2 w-2 rounded-full bg-pink-400 animate-pulse delay-150"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </BlockWrapper>
  )
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
  },
}

const SectionCard = ({
  title,
  content,
  image,
  isFirst = false,
}: {
  title: string
  content: any
  image?: any
  isFirst?: boolean
}) => (
  <motion.div
    variants={cardVariants}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    whileHover={{
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 },
    }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      'relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 shadow-xl transition-all duration-300 hover:shadow-2xl',
      isFirst
        ? 'from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-900/50'
        : 'from-purple-50 to-pink-100 dark:from-purple-950/50 dark:to-pink-900/50',
      'border border-white/20 backdrop-blur-sm',
    )}
  >
    {/* Background decoration */}
    <div
      className={cn(
        'absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10',
        isFirst ? 'bg-blue-400' : 'bg-purple-400',
      )}
    />
    <div
      className={cn(
        'absolute -bottom-8 -left-8 h-32 w-32 rounded-full opacity-5',
        isFirst ? 'bg-indigo-400' : 'bg-pink-400',
      )}
    />

    <div className="relative z-10">
      {image && (
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 overflow-hidden rounded-xl"
        >
          <Media
            resource={image}
            className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      )}

      <motion.h3
        // Remove explicit initial/animate to allow variant propagation or use whileInView if independent
        // But since parent has variants, we should probably stick to variants or simple propagation
        // However, these were using independent animations.
        // Let's use whileInView for safety or just let them inherit 'visible' from parent
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={cn(
          'mb-4 text-2xl font-bold',
          isFirst ? 'text-blue-900 dark:text-blue-100' : 'text-purple-900 dark:text-purple-100',
        )}
      >
        {title}
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className={cn(
          'prose prose-lg max-w-none',
          isFirst ? 'prose-blue dark:prose-invert' : 'prose-purple dark:prose-invert',
          'prose-p:text-gray-700 dark:prose-p:text-gray-300',
        )}
      >
        <RichText data={content} enableGutter={false} />
      </motion.div>
    </div>
  </motion.div>
)
