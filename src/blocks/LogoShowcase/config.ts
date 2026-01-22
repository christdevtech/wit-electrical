import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'

export const LogoShowcase: Block = {
  slug: 'logoShowcase',
  interfaceName: 'LogoShowcaseBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      label: 'Section Title (Optional)',
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Logos',
      minRows: 1,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL (Optional)',
        },
      ],
    },
    {
      name: 'animationSpeed',
      type: 'number',
      label: 'Animation Speed (Seconds)',
      defaultValue: 20,
      min: 5,
      max: 100,
      admin: {
        description: 'Duration for one complete loop in seconds. Lower is faster.',
      },
    },
    {
      name: 'threshold',
      type: 'number',
      label: 'Scrolling Threshold',
      defaultValue: 4,
      admin: {
        description: 'Minimum number of logos required to enable scrolling animation.',
      },
    },
  ],
  labels: {
    singular: 'Logo Showcase',
    plural: 'Logo Showcases',
  },
}
