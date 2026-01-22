import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const FounderNote: Block = {
  slug: 'founderNote',
  interfaceName: 'FounderNoteBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Meet Our Founder',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Section Description (Optional)',
      admin: {
        description: 'Brief intro text before the founder card',
      },
    },
    {
      name: 'founderPhoto',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Founder Photo',
    },
    {
      name: 'founderName',
      type: 'text',
      required: true,
      defaultValue: 'Eng. Abel B. B. Tabi',
      label: 'Founder Name',
    },
    {
      name: 'founderPosition',
      type: 'text',
      required: true,
      label: 'Position/Title',
      defaultValue: 'Founder & CEO',
    },
    {
      name: 'founderMessage',
      type: 'richText',
      required: true,
      label: 'Message/Quote',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        description: "The founder's message, quote, or story",
      },
    },
    {
      name: 'signatureImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Signature Image (Optional)',
      admin: {
        description: 'Optional signature image to display at the bottom of the message',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
  labels: {
    singular: 'Founder Note',
    plural: 'Founder Notes',
  },
}
