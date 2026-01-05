import type { Block } from 'payload'
import { link } from '@/fields/link'
import { backgroundField, blockIdField } from '@/fields/blockFields'

export const Grid: Block = {
  slug: 'grid',
  interfaceName: 'GridBlock',
  fields: [
    backgroundField,
    blockIdField,
    {
      name: 'gridColumns',
      type: 'number',
      min: 1,
      max: 12,
      defaultValue: 4,
      label: 'Total Columns (Desktop)',
    },
    {
      name: 'items',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'colSpan',
              label: 'Column Span (Base/Mobile)',
              type: 'number',
              min: 1,
              max: 12,
              defaultValue: 1,
              required: true,
              admin: {
                width: '25%',
              },
            },
            {
              name: 'colSpanMd',
              label: 'Column Span (Medium)',
              type: 'number',
              min: 1,
              max: 12,
              admin: {
                width: '25%',
              },
            },
            {
              name: 'colSpanLg',
              label: 'Column Span (Large)',
              type: 'number',
              min: 1,
              max: 12,
              admin: {
                width: '25%',
              },
            },
            {
              name: 'colSpanXl',
              label: 'Column Span (Extra Large)',
              type: 'number',
              min: 1,
              max: 12,
              admin: {
                width: '25%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Card', value: 'card' },
                { label: 'Media', value: 'media' },
                { label: 'Slider', value: 'slider' },
                { label: 'Text', value: 'text' },
                { label: 'Stat', value: 'stat' },
                { label: 'Testimonial', value: 'testimonial' },
                { label: 'Partner', value: 'partner' },
              ],
              required: true,
            },
          ],
        },
        {
          name: 'partner',
          type: 'relationship',
          relationTo: 'partners',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'partner',
          },
        },
        {
          name: 'aspectRatio',
          type: 'select',
          admin: { condition: (_, siblingData) => siblingData?.type === 'partner' },
          options: [
            { label: '9/16', value: 'aspect-[9/16]' },
            { label: '3/4', value: 'aspect-[3/4]' },
            { label: '4/5', value: 'aspect-[4/5]' },
            { label: '5/6', value: 'aspect-[5/6]' },
            { label: 'Square', value: 'aspect-square' },
            { label: '2/3', value: 'aspect-[2/3]' },
          ],
          defaultValue: 'aspect-[3/4]',
        },
        {
          name: 'cardTitle',
          type: 'text',
          admin: { condition: (_, siblingData) => siblingData?.type === 'card' },
          defaultValue: 'Welcome to Kinsmen Advocates Law Firm.',
        },
        {
          name: 'cardTitleSize',
          type: 'select',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'card',
            description: 'Select the font size for the card title.',
          },
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          defaultValue: 'medium',
        },
        {
          name: 'cardDescription',
          type: 'richText',
          admin: { condition: (_, siblingData) => siblingData?.type === 'card' },
        },
        {
          name: 'cardDescriptionSize',
          type: 'select',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'card',
            description: 'Select the font size for the card description.',
          },
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          defaultValue: 'medium',
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            admin: { condition: (_, siblingData) => siblingData?.type === 'card' },
          },
        }),
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: (_, siblingData) => siblingData?.type === 'media' },
        },
        {
          name: 'slides',
          type: 'array',
          admin: { condition: (_, siblingData) => siblingData?.type === 'slider' },
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'richText',
          type: 'richText',
          admin: { condition: (_, siblingData) => siblingData?.type === 'text' },
        },
        {
          type: 'row',
          admin: { condition: (_, siblingData) => siblingData?.type === 'stat' },
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
        {
          name: 'quote',
          type: 'textarea',
          admin: { condition: (_, siblingData) => siblingData?.type === 'testimonial' },
        },
        {
          type: 'row',
          admin: { condition: (_, siblingData) => siblingData?.type === 'testimonial' },
          fields: [
            { name: 'author', type: 'text' },
            { name: 'role', type: 'text' },
          ],
        },
      ],
    },
  ],
}
