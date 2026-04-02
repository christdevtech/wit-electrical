import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'

export const KineticFAQBlock: Block = {
  slug: 'kineticFAQ',
  interfaceName: 'KineticFAQBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
