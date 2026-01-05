import { CollectionConfig } from 'payload'

export const Partnerships: CollectionConfig = {
  slug: 'partnerships',
  labels: {
    singular: 'Partnership',
    plural: 'Partnerships',
  },
  defaultPopulate: {
    name: true,
    link: true,
    logo: true,
    backgroundColor: true,
  },
  admin: {
    defaultColumns: ['name', 'link', 'logo', 'backgroundColor'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        placeholder: 'https://www.example.com',
      },
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'text',
      defaultValue: '#FFFFFF',
      validate: (value: any) => {
        if (value && !/^#[0-9A-F]{6}$/i.test(value)) {
          return 'Please enter a valid hex color (e.g. #FFFFFF)'
        }
        return true
      },
    },
  ],
}
