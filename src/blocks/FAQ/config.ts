// src/blocks/FAQ.ts
import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'header',
      label: 'Header',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'items',
      label: 'Questions',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          // you asked for "resposnode"—using a clear camelCase name:
          name: 'responseNode',
          label: 'Response',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
