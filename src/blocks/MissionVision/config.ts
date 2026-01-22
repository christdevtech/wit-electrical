import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { backgroundField, blockIdField } from '@/fields/blockFields'

export const MissionVision: Block = {
  slug: 'missionVision',
  interfaceName: 'MissionVisionBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'missionVisionTitle',
      type: 'text',
      defaultValue: 'Mission & Vision',
      required: true,
      admin: {
        description: 'The title for the mission & vision section',
      },
    },
    {
      name: 'mainDescription',
      type: 'text',
      defaultValue:
        'At WIT Electrical, we specialize in comprehensive electrical solutions for homes, offices, and commercial spaces. From installations and upgrades to emergency repairs and energy-efficient innovations, we ensure your property is safe, functional, and future-ready. In a world where power outages and surges are common, we protect what matters most—your family, business, and investments.',
    },
    {
      name: 'missionTitle',
      type: 'text',
      defaultValue: 'Our Mission',
      required: true,
      admin: {
        description: 'The title for the mission section',
      },
    },
    {
      name: 'missionContent',
      type: 'richText',
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
      required: true,
      admin: {
        description: 'Rich text content for the mission statement',
      },
      defaultValue: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'To provide safe, reliable, and innovative electrical solutions for homes, offices, and commercial spaces. We use top-grade materials, adhere to safety codes, and deliver craftsmanship that prevents hazards, saves you money, and ensures your property is future-ready.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      name: 'missionImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional image to display with the mission section',
      },
    },
    {
      name: 'visionTitle',
      type: 'text',
      defaultValue: 'Our Vision',
      required: true,
      admin: {
        description: 'The title for the vision section',
      },
    },
    {
      name: 'visionContent',
      type: 'richText',
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
      required: true,
      admin: {
        description: 'Rich text content for the vision statement',
      },
      defaultValue: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'To be your trusted power guardians—protecting families from risks, helping businesses avoid costly interruptions, and promoting sustainability through energy-efficient designs. We create reliable, value-adding systems that let you thrive without worry, ensuring long-term peace of mind, lower costs, and a brighter future.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      name: 'visionImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional image to display with the vision section',
      },
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        {
          label: 'Side by Side',
          value: 'sideBySide',
        },
        {
          label: 'Stacked',
          value: 'stacked',
        },
      ],
      defaultValue: 'sideBySide',
      required: true,
      admin: {
        description: 'Choose how to display the mission and vision sections',
      },
    },
  ],
  labels: {
    singular: 'Mission & Vision Block',
    plural: 'Mission & Vision Blocks',
  },
}
