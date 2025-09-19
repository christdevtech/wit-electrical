import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'lightModeLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Light Mode Logo',
      admin: {
        description: 'Optional logo to display in light mode. If not provided, the default logo will be used.',
      },
    },
    {
      name: 'darkModeLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Dark Mode Logo',
      admin: {
        description: 'Optional logo to display in dark mode. If not provided, the default logo will be used.',
      },
    },
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
