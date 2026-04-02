import type { Block } from 'payload'

import { backgroundField, blockIdField } from '@/fields/blockFields'
import { linkGroup } from '@/fields/linkGroup'

export const KineticCTABlock: Block = {
  slug: 'kineticCTA',
  interfaceName: 'KineticCTABlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Ready to Power Your Project?',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Contact us today for a technical assessment or request an emergency dispatch team to your location.',
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
