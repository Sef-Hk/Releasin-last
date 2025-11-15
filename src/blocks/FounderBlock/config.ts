import { Block } from "payload";

export const Founders : Block = {
    slug:'founders',
    interfaceName:'foundersInter',
    labels:{
        singular:'Founder',
        plural:'Founders'
    },
    fields:[
        {
            name:'header',
            label:'header',
            type:'text'
        },
        {
            name:'person',
            type:'array',
            label:'founder',
            fields:[
                {
                    name:'name',
                    label:'founder name',
                    type:'text'
                },
                {
                    name:'desc',
                    label:'description',
                    type:'textarea'
                },
                {
                    name:'image',
                   
                    type:'upload',
                    relationTo:'media',
                    label:'image',
                }
            ]
        },
        {
            name:'bottomdesc',
            label:'Description',
            type:'textarea'
        },

    ]
}