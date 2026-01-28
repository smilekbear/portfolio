import {api, HttpResponse} from "@/shared/api/http";
import {UploadUrlDto, UploadUrlResponse} from "@/entities/dto/upload/upload_url_dto";

export function fetchGetUploadUrlApi(
    contentType : string,
    fileName? : string,
    folder? : string,
    expiresInSeconds? : number
) : Promise<HttpResponse<UploadUrlDto>> {
    return api.get('/api/upload/presign', {
        params : {
            contentType,
            ...(fileName && {fileName}),
            ...(folder && {folder}),
            ...(expiresInSeconds && {expiresInSeconds}),
        }
    })
}

export async function uploadToS3(item: UploadUrlDto, file : File) {
    const response = await fetch(item.uploadUrl, {
        method : item.method ?? "PUT",
        headers : {
            "Content-Type" : item.contentType || file.type
        },
        body : file
    })

    if(!response.ok){
        const message = await response.text().catch(() => "")
        throw new Error(`S3 upload failed: ${response.status} ${response.statusText} ${message}`)
    }

    return item.publicUrl
}