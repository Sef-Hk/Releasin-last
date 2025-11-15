import { Block } from "payload";

export const HeaderBehind : Block = {
    slug:'headerbehind',
    interfaceName:'headerbehindInter',
    labels:{
        singular:' Header behind ',
        plural:' Header behind '
    },
    fields:[
        {
            name:'header',
            type:'text',
            label:'Header'

        },
        {
            name:'desc',
            type:'textarea',
            label:'Description'

        },
    ]
}