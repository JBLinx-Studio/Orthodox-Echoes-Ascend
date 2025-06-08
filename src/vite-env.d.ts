
/// <reference types="vite/client" />

declare const __BUILD_TIME__: string;

interface ImportMetaEnv {
  readonly VITE_CACHE_BUSTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
