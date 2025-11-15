import { Block } from 'payload'

export const CustomBlock: Block = {
  slug: 'customBlock',
  interfaceName:'customblockInter',
  labels: {
    singular: 'Custom Block',
    plural: 'Custom Blocks',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Text',
    },
    {
      name: 'logosArray',
      type: 'array',
      label: 'Logos Array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Item',
        },
      ],
    },
  ],
}
