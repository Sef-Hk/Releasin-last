import { Block } from "payload";

export const Services : Block = {
    slug:'services',
    interfaceName:'servicesinter',
    labels: {
        singular: 'Releasin Services',
        plural: 'Releasin Services',
      },
    fields:[
       {
        name:'title',
        type:'text',
        label:'Section Title'
       },
       {
        name:'services',
        type:'array',
        label:'Add services',
        fields:[
            {
                name:'title',
                type:'text',
                label:'Service Title'  
            },
            {
                name:'description',
                type:'textarea',
                label:'Service Description'  
            },
            {
                name:'image',
                type:'upload',
                relationTo:'media',
                label:'Service image'  
            }
        ]

       }
    ]
}