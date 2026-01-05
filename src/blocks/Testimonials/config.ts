import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'clientName',
          type: 'text',
          required: true,
        },
        {
          name: 'quote',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
        },
      ],
    },
  ],
  labels: {
    plural: 'Testimonials Blocks',
    singular: 'Testimonials Block',
  },
}
