import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const Banner: Block = {
  slug: 'banner',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
      defaultValue: {
        root: {
          type: 'root',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Emergency Electrical Services Available 24/7. We respond with urgency and precision to keep your home and business safe.',
                  mode: 'normal',
                  detail: 0,
                  format: 1,
                  style: '',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
    },
  ],
  interfaceName: 'BannerBlock',
}
