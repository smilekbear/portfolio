"use client";

import { useCallback, useState } from "react";
import { knowledgeApi, knowledgeCreateApi, knowledgeDetailApi } from "@/entities/api/knowledge/KnowledgeApi";
import { fetchGetUploadUrlApi, uploadToS3 } from "@/entities/api/upload/upload_api";
import { KnowledgeCreateDto } from "@/entities/dto/knowledge/knowledge_create_dto";
import { KnowledgeItemDto } from "@/entities/dto/knowledge/KnowledgeDto";
import { HttpError } from "@/shared/api/http";

type UseKnowledgeState = {
    httpStatusCode: number;
    code: number | null;
    message: string | null;
    data: KnowledgeItemDto[] | null;
    total: number;
    loading: boolean;
    error?: string | null;
};

type UseKnowledgeWriteState = {
    httpStatusCode: number;
    code: number | null;
    message: string | null;
    id: number | null;
    loading: boolean;
};

type UseKnowledgeDetailState = {
    httpStatusCode: number;
    code: number | null;
    message: string | null;
    data: KnowledgeDetailData | null;
    loading: boolean;
};

export function useKnowledge() {
    const [state, setState] = useState<UseKnowledgeState>({
        httpStatusCode: 0,
        code: null,
        message: null,
        data: null,
        total: 0,
        loading: true,
        error: null,
    });

    const [detailState, setDetailState] = useState<UseKnowledgeDetailState>({
        httpStatusCode: 0,
        code: null,
        message: null,
        data: null,
        loading: false,
    });

    const [writeState, setWriteState] = useState<UseKnowledgeWriteState>({
        httpStatusCode: 0,
        code: null,
        message: null,
        id: null,
        loading: false,
    });

    const fetch = useCallback(async (
        searchValue: string,
        limit: number,
        offset: number,
        category: string
    ): Promise<void> => {
        setState((s) => ({ ...s, loading: true, error: null }));

        try {
            const dto = await knowledgeApi(searchValue, limit, offset, category);
            setState({
                httpStatusCode: dto.status,
                code: dto.data.code,
                data: dto.data.data.items,
                total: dto.data.total,
                message: dto.data.message,
                loading: false,
                error: null,
            });
        } catch (e: unknown) {
            if (e instanceof HttpError) {
                setState({
                    httpStatusCode: e.status,
                    code: Number(e.body?.code ?? 0),
                    message: e.body?.message ?? "포트폴리오 조회 실패",
                    data: null,
                    total: 0,
                    loading: false,
                    error: e.body?.message ?? "포트폴리오 조회 실패",
                });
            }
        }
    }, []);

    const detailFetch = useCallback(async (id: string): Promise<void> => {
        setDetailState((prev) => ({ ...prev, loading: true }));

        try {
            const response = await knowledgeDetailApi(id);
            setDetailState({
                httpStatusCode: response.status,
                code: response.data.code,
                data: response.data.data,
                message: response.data.message,
                loading: false,
            });
        } catch (e: unknown) {
            if (e instanceof HttpError) {
                setDetailState({
                    httpStatusCode: e.status,
                    code: Number(e.body?.code ?? 0),
                    message: e.body?.message ?? "지식창고 상세 조회 실패",
                    data: null,
                    loading: false,
                });
            }
        }
    }, []);

    const writeFetch = useCallback(async (req: KnowledgeCreateDto, fileList: File[] | null): Promise<number | null> => {
        setWriteState({ httpStatusCode: 0, code: null, message: null, loading: true, id: null });

        try {
            const imageList: string[] = [];

            if (fileList) {
                for (const file of fileList) {
                    const uploadResponse = await fetchGetUploadUrlApi(file.type, file.name, "knowledge", 600);
                    const imageUrl = await uploadToS3(uploadResponse.data, file);
                    imageList.push(imageUrl);
                }
                req.imageUrlList = imageList;
            }

            const response = await knowledgeCreateApi(req);

            setWriteState({
                httpStatusCode: response.status,
                code: 0,
                message: "게시글 등록 성공",
                loading: false,
                id: response.data.id,
            });

            return response.data.id;
        } catch (e: unknown) {
            if (e instanceof HttpError) {
                setWriteState({
                    httpStatusCode: e.status,
                    code: Number(e.body?.code ?? 0),
                    message: e.body?.message ?? "글 등록 실패",
                    id: null,
                    loading: false,
                });
            }
            return null;
        }
    }, []);

    return { state, fetch, writeState, writeFetch, detailState, detailFetch };
}