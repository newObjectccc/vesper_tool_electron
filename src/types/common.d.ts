declare module '*.module.css' {
  const styles: { readonly [key: string]: string };
  export default styles;
}

declare let window: Window & typeof globalThis;

interface Window {
  electron: {
    clipboard: {
      readText: () => string;
      writeText: (text: string) => void;
    };
    imgSrcMap: Map<string, string>;
  };
}
