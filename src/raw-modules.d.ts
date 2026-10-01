// Lets TypeScript understand Vite's `?raw` imports (used for the About page markup)
declare module "*?raw" {
  const content: string;
  export default content;
}
