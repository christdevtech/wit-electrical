import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  contactForm: Form
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
}) => {
  return {
    slug: 'contact',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'formBlock',
        enableIntro: true,
        form: contactForm,
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Contact WIT Electrical',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h1',
                version: 1,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Phone/WhatsApp: +237681553714',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Email: info@witelectrical.com',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Fill out our contact form for quotes, consultations, or emergencies. We\'re available 24/7 for repairs. Power issues? Reach out today!',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
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
    ],
    title: 'Contact',
  }
}
