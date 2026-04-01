import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'
import { linkGroup } from '@/fields/linkGroup'

export const EmergencyPulseBlock: Block = {
  slug: 'emergencyPulse',
  interfaceName: 'EmergencyPulseBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'pulseLabel',
      type: 'text',
      defaultValue: '24/7 Response',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Electrical Emergency?',
    },
    {
      name: 'text',
      type: 'textarea',
      defaultValue: 'Our rapid response team is available 24/7 across Cameroon.',
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 1,
      },
    }),
  ],
}
