import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { backgroundField, blockIdField } from '@/fields/blockFields'
import { link } from '@/fields/link'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'layout',
      type: 'radio',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Split Sidebar', value: 'splitSidebar' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'sidebarTitle',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'splitSidebar',
      },
      defaultValue: 'Request a Service Quote',
    },
    {
      name: 'sidebarDescription',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'splitSidebar',
      },
      defaultValue: 'Fill out the form below and we will get back to you as soon as possible.',
    },
    {
      name: 'sidebarContacts',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'splitSidebar',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [{ label: 'Activity', value: 'Activity' }],
          admin: {
            components: {
              Field: '@/components/Payload/IconPicker#IconPickerField',
            },
          },
        },
        link({
          appearances: false,
          disableLabel: false,
        }),
      ],
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'default',
      },
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
