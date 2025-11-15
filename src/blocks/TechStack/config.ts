import { Block } from "payload";

export const TechStack :Block = {
    slug: 'tecstack', 
    interfaceName:'TechstackInter',
    labels:{
        singular : 'Tech Stack',
        plural :  'Tech Stack'
    },
    fields:[
        {
            name:'header',
            type:'text',
            label:'Global title'
        },
 {
          name:'techs',
          type:'array',
          label:'add techs',
          fields:[
        {
            name:'title',
            type:'text',
            label:'Technologie Name'
        },
        {
            name:'desc',
            type:'text',
            label:'Technologie Description'
        },
        {
            name:'logo',
            type:'upload',
            relationTo:'media',
            label:'Technologie Image'
        }

    ]} ]

}