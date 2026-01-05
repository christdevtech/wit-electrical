import type { Block } from 'payload'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
