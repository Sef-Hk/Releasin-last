import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
//new blocks :
import HeaderHero from './HeaderHeo/component'
import ReleasinNumber from './ReleasinNumbers/component'
import Services from './Services/component'
import { LetsTalk } from './LetsTalk/components'
import { TechStack } from './TechStack/components'
import FAQSection from './FAQ/component'
import HeaderBehind from './HeaderBehind/component'
import { FounderCompo } from './FounderBlock/component'
import { OpenPosition } from './OpenPosition/components'
const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  //New blocks
  customBlock:HeaderHero,
  relnumber:ReleasinNumber,
  services:Services,
  letstalk:LetsTalk,
  tecstack:TechStack,
  faq:FAQSection,
  headerbehind:HeaderBehind,
  founders:FounderCompo,
  openposition:OpenPosition
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
