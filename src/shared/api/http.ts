type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export type ApiErrorBody = {
    code?: string | number
    message?: string
}

export class HttpError extends Error {
    readonly status: number
    readonly body: ApiErrorBody | null

    constructor(status: number, body: ApiErrorBody | null) {
        super(body?.message ?? "HTTP Error")
        this.name = "HttpError"
        this.status = status
        this.body = body
    }
}
type QueryParamValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | Array<string | number | boolean>

type QueryParams = Record<string, QueryParamValue>

type RequestOptions = {
    method?: HttpMethod
    headers?: HeadersInit
    body?: unknown
    params?: QueryParams
    cache?: RequestCache
    next?: NextFetchRequestConfig
}
export type HttpResponse<T> = {
    data: T
    status: number
    ok: boolean
    headers: Headers
}
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function http<T>(
    url: string,
    options: RequestOptions = {}
): Promise<HttpResponse<T>> {
    const {
        method = "GET",
        headers,
        body,
        params,
        cache = "no-store",
        next
    } = options

    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null

    const qs = params
        ? new URLSearchParams(
            Object.entries(params)
                .filter(([, v]) => v !== undefined && v !== null)
                .flatMap(([k, v]) =>
                    Array.isArray(v)
                        ? v.map((vv) => [k, String(vv)] as [string, string])
                        : [[k, String(v)] as [string, string]]
                )
          ).toString()
        : ""

    // const fullUrl = `${BASE_URL}${url}${qs ? `?${qs}` : ""}`        //LOCAL
    const fullUrl = `${url}${qs ? `?${qs}` : ""}`        //Server

    const response = await fetch(fullUrl, {
        method,
        headers: {
            "Content-Type" : "application/json",
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
        cache,
        next
    })
    const text = await response.text()
    const data = text ? JSON.parse(text) : null

    if(!response.ok){
        const errorBody = await response.json().catch(() => null)

        if(response.status === 401) {

        }
        throw {
            status : response.status,
            body : errorBody
        }
    }
    return {
        data: data as T,
        status: response.status,
        ok: response.ok,
        headers: response.headers,
    }
}

export const api = {
    get: <T>(url: string, options?: RequestOptions) =>
        http<T>(url, { ...options, method: "GET" }),

    post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
        http<T>(url, { ...options, method: "POST", body }),

    put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
        http<T>(url, { ...options, method: "PUT", body }),

    delete: <T>(url: string, options?: RequestOptions) =>
        http<T>(url, { ...options, method: "DELETE" }),
};