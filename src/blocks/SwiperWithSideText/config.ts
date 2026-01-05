import { linkGroup } from '@/fields/linkGroup'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const SwiperWithSideTextBlock: Block = {
  slug: 'swiperWithSideText',
  interfaceName: 'SwiperWithSideTextBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'title',
      type: 'text',
      defaultValue: 'This is the Title',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'slides',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        linkGroup({
          overrides: {
            name: 'buttons',
          },
        }),
      ],
    },
  ],
}
