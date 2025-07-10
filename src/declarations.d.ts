// src/declarations.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
interface ImportMetaEnv {
  readonly VITE_NOTEHUB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
