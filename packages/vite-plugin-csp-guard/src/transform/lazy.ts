export const replaceVitePreload = (code: string) =>  {
    return code.replace(/__VITE_PRELOAD__/g, '[]');
}