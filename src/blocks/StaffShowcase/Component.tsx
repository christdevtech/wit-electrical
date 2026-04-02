'use client'

import React from 'react'
import type { StaffShowcaseBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { BlockWrapper } from '@/components/BlockWrapper'
import { cn } from '@/utilities/ui'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail, Globe } from 'lucide-react'

type Props = {
  className?: string
} & StaffShowcaseBlock

export const StaffShowcaseBlockComponent: React.FC<Props> = ({
  className,
  title,
  description,
  staff,
  layout = 'grid',
  cardsPerRow = '3',
  backgroundVariant,
  colorTheme,
  backgroundImage,
  blockId,
}) => {
  const gridCols = cardsPerRow === '4' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'

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
          {title && (
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Staff Grid/Carousel */}
        {layout === 'grid' ? (
          <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-8', gridCols)}>
            {staff?.map((member, index) => (
              <StaffCard key={index} member={member} index={index} />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Carousel implementation would go here if needed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff?.map((member, index) => (
                <StaffCard key={index} member={member} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </BlockWrapper>
  )
}

// Staff Card Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StaffCard = ({ member, index }: { member: any; index: number }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'twitter':
        return <Twitter className="w-5 h-5" />
      case 'email':
        return <Mail className="w-5 h-5" />
      case 'website':
        return <Globe className="w-5 h-5" />
      default:
        return null
    }
  }

  const getSocialHref = (platform: string, url: string) => {
    if (platform === 'email') {
      return `mailto:${url}`
    }
    return url
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Photo Section */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
        {member.photo && typeof member.photo !== 'string' && (
          <div className="relative h-full w-full grayscale group-hover:grayscale-0 transition-all duration-500">
            <Media
              resource={member.photo}
              className="h-full w-full object-cover"
              imgClassName="h-full w-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Social Links - Appear on hover */}
        {member.socialLinks && member.socialLinks.length > 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {member.socialLinks.map((social: any, idx: number) => (
              <a
                key={idx}
                href={getSocialHref(social.platform, social.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
          {member.position}
        </p>

        {member.bio && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{member.bio}</p>
        )}

        {/* Decorative element */}
        <div className="mt-4 h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-300" />
      </div>
    </motion.div>
  )
}
