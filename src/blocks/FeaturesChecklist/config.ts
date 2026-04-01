import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'

export const FeaturesChecklistBlock: Block = {
  slug: 'featuresChecklist',
  interfaceName: 'FeaturesChecklistBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'We Build Reliable Systems',
    },
    {
      name: 'content',
      type: 'textarea',
    },
    {
      name: 'checklist',
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
          ], // Options handled by picker
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
