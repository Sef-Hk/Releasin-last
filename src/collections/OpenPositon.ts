import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
  } from '@payloadcms/richtext-lexical'

export const OpenPostions: CollectionConfig = {
  slug: 'openpositions',
  
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
 fields:[
    {   
        name:'header',
        type:'text',
        label:'Position name'
    },
    {   
        name:'location',
        type:'text',
        label:'location'
    },
    {   
        name:'type',
        type:'text',
        label:'type'
    },
    {
        name:'department',
        type:'text',
        label:'department'
    },
    {
        name:'reportsto',
        type:'text',
        label:'reports to'
    },

    {
        name:'hiringdate',
        type:'text',
        label:'hiring date'
    },

    {
        name: 'jobDescription',
        label: 'Job Description',
        type: 'richText',
        editor: lexicalEditor({
          features: ({ rootFeatures }) => {
            return [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ]
          },
        }),
      },

    

 ]
  
}
