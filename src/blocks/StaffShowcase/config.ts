import type { Block } from 'payload'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const StaffShowcase: Block = {
  slug: 'staffShowcase',
  interfaceName: 'StaffShowcaseBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Meet Our Team',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description (Optional)',
    },
    {
      name: 'staff',
      type: 'array',
      label: 'Staff Members',
      minRows: 1,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Profile Photo',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Full Name',
        },
        {
          name: 'position',
          type: 'text',
          required: true,
          label: 'Job Title/Position',
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Short Bio (Optional)',
          admin: {
            description: 'Brief description about the staff member',
          },
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Media Links (Optional)',
          maxRows: 4,
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Email', value: 'email' },
                { label: 'Website', value: 'website' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL or Email Address',
            },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Display Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'cardsPerRow',
      type: 'select',
      label: 'Cards Per Row (Desktop)',
      defaultValue: '3',
      options: [
        { label: '3 Cards', value: '3' },
        { label: '4 Cards', value: '4' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.layout === 'grid',
      },
    },
  ],
  labels: {
    singular: 'Staff Showcase',
    plural: 'Staff Showcases',
  },
}
