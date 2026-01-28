export type KnowledgeItemDto = {
    id: number
    category: string
    iconKey: string
    title: string
    summary: string
    thumbnailUrl: string | null
    contentRef : string
    updatedAt: string
}

export type KnowledgeListData = {
    items: KnowledgeItemDto[]
}

export type KnowledgeListResponse = {
    code: number
    message: string
    data: KnowledgeListData
    total : number
}