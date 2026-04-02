import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'

export const KineticTestimonialsBlock: Block = {
  slug: 'kineticTestimonials',
  interfaceName: 'KineticTestimonialsBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'sectionTitle',
      type: 'text',
      required: true,
      defaultValue: 'Trusted Voices',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'What our clients say about WIT excellence',
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
        },
        {
          name: 'authorRole',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
