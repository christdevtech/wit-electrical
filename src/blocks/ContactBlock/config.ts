import type { Block } from 'payload'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  labels: {
    plural: 'Contact Sections',
    singular: 'Contact Section',
  },
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Contact Us',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      required: true,
      defaultValue: 'Limbe, Cameroon',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      required: true,
      defaultValue: '+237681553714',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      defaultValue: 'info@witelectrical.com',
    },
  ],
}
