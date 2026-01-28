"use client";

import { useEffect, useRef, useState } from "react";
import { fetchPortfolio } from "@/entities/api/portfolio/portfolioApi";
import { PortfolioResponse } from "@/entities/dto/portfolio/portfolioDto";
import {HttpError} from "@/shared/api/http";

type UsePortfolioState = {
  statusCode : number,
  code : number,
  message: string | null;
  data: PortfolioResponse | null;
  loading: boolean;
};

export function usePortfolio() {
  const [state, setState] = useState<UsePortfolioState>({
    statusCode : 0,
    code: 0,
    message: null,
    data: null,
    loading: true,

  });

  const fetchedRef = useRef(false);

  const reFetch = async (): Promise<void> => {
    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const response = await fetchPortfolio();
      setState({
        statusCode : response.status,
        code : response.data.code ?? "UNKNOWN",
        message: null,
        data: response.data,
        loading: false,
      });
    } catch (e: unknown) {
      if (e instanceof HttpError) {
        setState({
          statusCode: e.status,
          code: Number(e.body?.code ?? 0),         // code를 number로 유지할거면
          message: e.body?.message ?? "포트폴리오 조회 실패",
          data: null,
          loading: false,
        });
        return;
      }
    }
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    void reFetch();
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    message: state.message,
    reFetch,
  };
}