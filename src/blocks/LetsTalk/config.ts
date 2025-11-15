import { link } from '@/fields/link'
import { Block } from 'payload'
export const LetsTalk :Block = {
    slug:'letstalk',
    interfaceName:'LetstalkInter',
    labels:{
        singular:'Lets Talk ',
        plural:'Lets Talk'
    },
    fields:[
        link(),
    ]
}