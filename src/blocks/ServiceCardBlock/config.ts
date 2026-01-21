import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const ServiceCardBlock: Block = {
  slug: 'serviceCardBlock',
  interfaceName: 'ServiceCardBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'introContent',
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
      label: 'Intro Content',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['services'],
    },
    {
      name: 'cardStyle',
      type: 'select',
      defaultValue: 'standard',
      options: [
        {
          label: 'Standard',
          value: 'standard',
        },
        {
          label: 'Sharp',
          value: 'sharp',
        },
        {
          label: 'Glass',
          value: 'glass',
        },
      ],
      admin: {
        description: 'Choose the visual style for the service cards.',
      },
    },
  ],
  labels: {
    plural: 'Service Card Blocks',
    singular: 'Service Card Block',
  },
}
