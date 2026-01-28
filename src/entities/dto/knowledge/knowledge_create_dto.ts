

export type KnowledgeCreateDto = {
    categoryId : number
    title : string
    summary : string
    content : string
    imageUrlList : string[]
}

export type KnowledgeCreateResponse = {
    id : number
}