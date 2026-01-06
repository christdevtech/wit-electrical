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
        "Kinsmen Advocates is a premier law firm headquartered in Buea, the vibrant capital of Cameroon's South West Region, with a branch office in Douala, the nation's bustling economic hub. Known for delivering world-class legal services, we cater to a diverse clientele of local and international individuals, corporations, and organizations. Renowned for our responsiveness and commitment to excellence, we continuously refine our approach to ensure exceptional results that align with the highest global standards.",
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
                  text: 'To provide innovative legal solutions and outstanding representation through a results-driven team committed to excellence, professionalism, and integrity.',
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
                  text: 'To be the leading law firm of choice in all areas of our practice, recognized for our unwavering dedication to achieving exceptional outcomes and fostering long-term client relationships.',
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
