import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'

export const ProcessStepsBlock: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Technical Workflow',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Our proven multi-stage process ensures systemic integrity.',
    },
    {
      name: 'steps',
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
