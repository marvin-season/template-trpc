import { Block, BlockClassificationEnum, BlockEnum } from "../types"

export const BLOCKS: Block[] = [
    {
        classification: BlockClassificationEnum.Default,
        type: BlockEnum.Start,
        title: 'Start',
        description: '',
    },
    {
        classification: BlockClassificationEnum.Default,
        type: BlockEnum.End,
        title: 'End',
    },
    {
        classification: BlockClassificationEnum.Logic,
        type: BlockEnum.IfElse,
        title: 'IF/ELSE',
    },
]

export const BLOCK_CLASSIFICATIONS: string[] = [
    BlockClassificationEnum.Default,
    BlockClassificationEnum.Logic,
]

