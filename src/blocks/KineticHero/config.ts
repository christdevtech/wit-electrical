import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { backgroundField, blockIdField } from '@/fields/blockFields'
import { linkGroup } from '@/fields/linkGroup'

export const KineticHeroBlock: Block = {
  slug: 'kineticHero',
  interfaceName: 'KineticHeroBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'floatingGlassCard',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'stats',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Activity', value: 'Activity' },
            { label: 'Zap', value: 'Zap' },
            { label: 'Shield', value: 'Shield' },
          ],
          admin: {
            components: {
              Field: '@/components/Payload/IconPicker#IconPickerField',
            },
          },
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
