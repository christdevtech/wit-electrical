import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'

export const CompanyStatsBlock: Block = {
  slug: 'companyStats',
  interfaceName: 'CompanyStatsBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional visually hidden title, or small overline.',
      },
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'E.g., "15+", "99.9%", "10k"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Activity', value: 'Activity' },
          ], // Picker will override this
          admin: {
            components: {
              Field: '@/components/Payload/IconPicker#IconPickerField',
            },
          },
        },
      ],
    },
  ],
}
