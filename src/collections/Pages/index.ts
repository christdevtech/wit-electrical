import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { SwiperWithSideTextBlock } from '@/blocks/SwiperWithSideText/config'
import { Testimonials } from '@/blocks/Testimonials/config'
import { AboutSummary } from '@/blocks/AboutSummary/config'
import { Grid } from '@/blocks/Grid/config'
import { MissionVision } from '@/blocks/MissionVision/config'
import { ContactBlock as ContactBlockConfig } from '@/blocks/ContactBlock/config'
import { ServiceCardBlock } from '@/blocks/ServiceCardBlock/config'
import { LogoShowcase } from '@/blocks/LogoShowcase/config'
import { StaffShowcase } from '@/blocks/StaffShowcase/config'
import { FounderNote } from '@/blocks/FounderNote/config'
import { KineticHeroBlock } from '@/blocks/KineticHero/config'
import { TechServiceCardsBlock } from '@/blocks/TechServiceCards/config'
import { FeaturesChecklistBlock } from '@/blocks/FeaturesChecklist/config'
import { EmergencyPulseBlock } from '@/blocks/EmergencyPulse/config'
import { KineticTestimonialsBlock } from '@/blocks/KineticTestimonials/config'
import { KineticFAQBlock } from '@/blocks/KineticFAQ/config'
import { ServicePlansBlock } from '@/blocks/ServicePlans/config'
import { ProcessStepsBlock } from '@/blocks/ProcessSteps/config'
import { KineticCTABlock } from '@/blocks/KineticCTA/config'
import { CompanyStatsBlock } from '@/blocks/CompanyStats/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                SwiperWithSideTextBlock,
                Testimonials,
                AboutSummary,
                Grid,
                MissionVision,
                ContactBlockConfig,
                ServiceCardBlock,
                LogoShowcase,
                StaffShowcase,
                FounderNote,
                KineticHeroBlock,
                TechServiceCardsBlock,
                FeaturesChecklistBlock,
                EmergencyPulseBlock,
                KineticTestimonialsBlock,
                KineticFAQBlock,
                ServicePlansBlock,
                ProcessStepsBlock,
                KineticCTABlock,
                CompanyStatsBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
