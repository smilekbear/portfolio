import {api, HttpResponse} from "@/shared/api/http";
import {KnowledgeListResponse} from "@/entities/dto/knowledge/KnowledgeDto";
import {KnowledgeCreateDto, KnowledgeCreateResponse} from "@/entities/dto/knowledge/knowledge_create_dto";

export async function knowledgeApi (
    keyword: string,
    limit : number,
    offset : number,
    category : string
) : Promise<HttpResponse<KnowledgeListResponse>> {
    return await api.get('/api/knowledge',{
        params: {
            keyword,
            limit,
            offset,
            category
        }
    })
}

export async function knowledgeDetailApi (
    id : string
) : Promise<HttpResponse<KnowledgeDetailResponse>> {
    return await api.get(`/api/knowledge/${id}`)
}

export async function knowledgeCreateApi (
    req : KnowledgeCreateDto
): Promise<HttpResponse<KnowledgeCreateResponse>> {
    return await api.post('/api/knowledge',req)
}