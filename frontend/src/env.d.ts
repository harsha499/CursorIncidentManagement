/// <reference types="@rsbuild/core/types" />

interface ProcessEnv {
  readonly VITE_API_URL: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends ProcessEnv {}
}

