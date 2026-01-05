import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateDelete, revalidateStaff } from './hooks/revalidateStaff'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'

export const Staff: CollectionConfig = {
  slug: 'staff',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'position', 'createdAt', 'updatedAt'],
    useAsTitle: 'name',
    // livePreview: {
    //   url: ({ data, req }) =>
    //     generatePreviewPath({
    //       slug: data.slug as string,
    //       collection: 'staff',
    //       req,
    //     }),
    // },
    // preview: (data, { req }) =>
    //   generatePreviewPath({
    //     slug: data.slug as string,
    //     collection: 'staff',
    //     req,
    //   }),
  },
  hooks: {
    afterChange: [revalidateStaff],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    {
      name: 'position',
      type: 'text',
      defaultValue: 'Partner',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'founder',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
}
