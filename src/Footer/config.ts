import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'whatsappWidget',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'phoneNumber',
          type: 'text',
          admin: {
            description: 'Enter number with country code (e.g., +2376...).',
            condition: (_, siblingData) => siblingData.enabled,
          },
        },
        {
          name: 'defaultMessage',
          type: 'textarea',
          admin: {
            condition: (_, siblingData) => siblingData.enabled,
          },
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'bottom-right',
          options: [
            { label: 'Bottom Right', value: 'bottom-right' },
            { label: 'Bottom Left', value: 'bottom-left' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.enabled,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
