export type UploadUrlDto = {
    key : string
    uploadUrl : string
    publicUrl : string
    method:  string
    contentType : string
    expiresInSeconds : number
}

export type UploadUrlResponse = {
    items : UploadUrlDto
}