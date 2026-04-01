import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'

export const TechServiceCardsBlock: Block = {
  slug: 'techServiceCards',
  interfaceName: 'TechServiceCardsBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'sectionTitle',
      type: 'text',
      required: true,
      defaultValue: 'Our Services',
    },
    {
      name: 'terminalLabel',
      type: 'text',
      admin: {
        description: 'A technical subtitle rendered in Space Grotesk',
      },
      defaultValue: 'SYS.STATUS_OPERATIONAL',
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Activity', value: 'Activity' },
          ], // Options will be overridden by the picker
          admin: {
            components: {
              Field: '@/components/Payload/IconPicker#IconPickerField',
            },
          },
        },
        {
          name: 'linkUrl',
          type: 'text',
          defaultValue: '#',
        },
        {
          name: 'technicalSpecs',
          type: 'array',
          fields: [
            { name: 'spec', type: 'text', required: true }
          ],
        },
      ],
    },
  ],
}
