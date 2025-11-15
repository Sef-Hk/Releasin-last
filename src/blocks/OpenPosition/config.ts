import { Block } from "payload";

export const OpenPosition :Block = {
    slug: 'openposition', 
    interfaceName:'OpenpositionInter',
    labels:{
        singular : 'Open Position',
        plural :  'Open Positions'
    },
    fields:[
        {
            name:'header',
            type:'text',
            label:'Global title'
        },
        {
            name:'postion',
            type: 'relationship',    
            relationTo:'openpositions',
            hasMany:true,
            label: 'Select open positions',
        }     
    
    ]

}