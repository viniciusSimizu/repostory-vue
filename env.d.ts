/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_BASEURL_API: string
    readonly VITE_CLIENT_ID: string
    readonly VITE_CLIENT_SECRET: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
