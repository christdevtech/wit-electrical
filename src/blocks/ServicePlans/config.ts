import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'
import { link } from '@/fields/link'

export const ServicePlansBlock: Block = {
  slug: 'servicePlans',
  interfaceName: 'ServicePlansBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Service Plans',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'plans',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          admin: {
            description: 'E.g., "Custom", "20,000 XAF/mo", etc.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'isPopular',
          type: 'checkbox',
          label: 'Highlight as Popular/Recommended',
          defaultValue: false,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
        link({ overrides: { name: 'actionLink' } }),
      ],
    },
  ],
}
