import React from 'react'
import RichText from '@/components/RichText'
import { SwiperWithSideTextBlock } from '@/payload-types'
import { SwiperClient } from './SwiperClient'

export const SwiperWithSideContent: React.FC<SwiperWithSideTextBlock> = (props) => {
  const { slides, title, description } = props

  return (
    <div className="bg-slate-300">
      <div className="container py-16 space-y-6">
        {title && <h2 className="text-4xl text-center"> {title}</h2>}
        {description && (
          <RichText enableGutter={false} data={description} className="text-xl text-center mb-4" />
        )}
        <SwiperClient slides={slides} />
      </div>
    </div>
  )
}
