type KnowledgeDetailDto = {
    id : string
    title : string
    category : string
    contentHtml : string
    createdAt : string
    updatedAt : string
}

type KnowledgeDetailData = {
    item : KnowledgeDetailDto
}

type KnowledgeDetailResponse = {
    code : number
    message : string
    data : KnowledgeDetailData
}