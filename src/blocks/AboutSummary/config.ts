import type { Block } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  BoldFeature,
  ItalicFeature,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const AboutSummary: Block = {
  slug: 'aboutSummary',
  interfaceName: 'AboutSummaryBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'About us',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          LinkFeature({ enabledCollections: ['pages', 'posts'] }),
        ],
      }),
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
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'At WIT Electrical, we specialize in comprehensive electrical solutions for homes, offices, and commercial spaces. From installations and upgrades to emergency repairs and energy-efficient innovations, we ensure your property is safe, functional, and future-ready. In a world where power outages and surges are common, we protect what matters most—your family, business, and investments.',
                  mode: 'normal',
                  detail: 0,
                  format: 0,
                  style: '',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Add link under text',
      defaultValue: true,
    },
    link({
      overrides: {
        admin: {
          hideGutter: true,
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
  ],
}
