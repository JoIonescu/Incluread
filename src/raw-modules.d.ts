// Lets TypeScript understand Vite's `?raw` imports (About page markup) and plain CSS imports.
declare module "*?raw" {
  const content: string;
  export default content;
}

declare module "*.css";