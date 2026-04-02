import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SwiperWithSideContent } from './SwiperWithSideText/Component'
import { TestimonialsBlock } from './Testimonials/Component'
import { AboutSummaryBlock } from '@/blocks/AboutSummary/Component'
import { GridBlock } from '@/blocks/Grid/Component'
import { ContactBlock as ContactBlockComponent } from '@/blocks/ContactBlock/Component'
import { ServiceCardBlock } from './ServiceCardBlock/Component'
import { LogoShowcaseBlockComponent } from './LogoShowcase/Component'
import { StaffShowcaseBlockComponent } from './StaffShowcase/Component'
import { FounderNoteBlockComponent } from './FounderNote/Component'
import { MissionVisionBlockComponent } from './MissionVision/Component'
import { KineticHeroComponent } from '@/blocks/KineticHero/Component'
import { TechServiceCardsComponent } from '@/blocks/TechServiceCards/Component'
import { FeaturesChecklistComponent } from '@/blocks/FeaturesChecklist/Component'
import { EmergencyPulseComponent } from '@/blocks/EmergencyPulse/Component'
import { KineticTestimonialsComponent } from '@/blocks/KineticTestimonials/Component'
import { KineticFAQComponent } from '@/blocks/KineticFAQ/Component'
import { ServicePlansComponent } from '@/blocks/ServicePlans/Component'
import { ProcessStepsComponent } from '@/blocks/ProcessSteps/Component'
import { KineticCTAComponent } from '@/blocks/KineticCTA/Component'
import { CompanyStatsComponent } from '@/blocks/CompanyStats/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  swiperWithSideText: SwiperWithSideContent,
  testimonials: TestimonialsBlock,
  aboutSummary: AboutSummaryBlock,
  grid: GridBlock,
  contactBlock: ContactBlockComponent,
  serviceCardBlock: ServiceCardBlock,
  logoShowcase: LogoShowcaseBlockComponent,
  staffShowcase: StaffShowcaseBlockComponent,
  founderNote: FounderNoteBlockComponent,
  missionVision: MissionVisionBlockComponent,
  kineticHero: KineticHeroComponent,
  techServiceCards: TechServiceCardsComponent,
  featuresChecklist: FeaturesChecklistComponent,
  emergencyPulse: EmergencyPulseComponent,
  kineticTestimonials: KineticTestimonialsComponent,
  kineticFAQ: KineticFAQComponent,
  servicePlans: ServicePlansComponent,
  processSteps: ProcessStepsComponent,
  kineticCTA: KineticCTAComponent,
  companyStats: CompanyStatsComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents] as any

            if (Block) {
              return (
                <Block {...block} className="py-8 md:py-10 lg:py-12 xl:py-16" key={index} />
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
