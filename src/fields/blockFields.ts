import type { Field } from 'payload'

export const backgroundField: Field = {
  type: 'row',
  fields: [
    {
      name: 'backgroundVariant',
      type: 'select',
      options: [
        { label: 'Color theme', value: 'color' },
        { label: 'Background image', value: 'image' },
      ],
      defaultValue: 'color',
      required: true,
    },
    {
      name: 'colorTheme',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundVariant === 'color',
        width: '50%',
      },
      options: [
        { label: 'Slate', value: 'slate' },
        { label: 'Gray', value: 'gray' },
        { label: 'Zinc', value: 'zinc' },
        { label: 'Neutral', value: 'neutral' },
        { label: 'Stone', value: 'stone' },
        { label: 'Blue', value: 'blue' },
        { label: 'Indigo', value: 'indigo' },
        { label: 'Violet', value: 'violet' },
        { label: 'Emerald', value: 'emerald' },
        { label: 'Teal', value: 'teal' },
        { label: 'Rose', value: 'rose' },
        { label: 'Default', value: 'default' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundVariant === 'image',
        width: '50%',
      },
    },
    {
      name: 'imageTextColor',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundVariant === 'image',
        width: '50%',
        description:
          'Choose the text color to use over the background image to ensure readability.',
      },
      options: [
        { label: 'Light (white)', value: 'white' },
        { label: 'Dark (black)', value: 'black' },
      ],
      defaultValue: 'white',
    },
  ],
}

export const blockIdField: Field = {
  name: 'blockId',
  label: 'Block ID (for navigation)',
  type: 'text',
  admin: {
    description: 'Enter a unique ID for this block to link to it (e.g., "about-us").',
  },
}
