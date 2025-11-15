import { Block } from 'payload'

export const RelNumber: Block = {
  slug: 'relnumber',
  interfaceName:'relnumberInter',
  labels: {
    singular: 'Releasin in Number',
    plural: 'Releasin in Number',
  },
  fields: [

   { name:'relnumb',
     type:'array',
     label:'releasin in nmuber',
     fields:[
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'number',
      type: 'number',
      label: 'Number',
    },
  ]
}
  ],
}
