import type { GlobalConfig } from 'payload'

export const ArchiveHero: GlobalConfig = {
  slug: 'archive-hero',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'servicesHero',
      type: 'group',
      label: 'Services Archive Hero',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Our Services',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Explore our range of professional electrical services.',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'postsHero',
      type: 'group',
      label: 'Posts Archive Hero',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Posts',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Latest updates and news.',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
