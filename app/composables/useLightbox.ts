import { useState } from '#app';

export const useLightbox = () => {
  const activeImageSrc = useState<string | null>('lightbox-src', () => null);

  const img = useImage();

  const openLightbox = (src: any) => {
    activeImageSrc.value = src;
  };

  // const openLightbox = (src: string) => {
  //   if (!src) return;

  //   // 1. Очищаем путь: если строка начинается с /_ipx/ или содержит его,
  //   // убираем префиксы движка, оставляя чистый путь к папке public
  //   let cleanSrc = src.replace(/^\/_ipx\/[^\/]+\//, '/');
  //   cleanSrc = cleanSrc.replace(/^\/_ipx\//, '/');
  //   // Метод getImage().url извлекает чистый, несжатый URL оригинального файла
  //   // Теперь, какую бы картинку вы сюда ни передали, она превратится в оригинал
  //   activeImageSrc.value = img.getImage(src).url;
  //   console.log('src:', src);
  //   console.log('img', activeImageSrc.value);
  // };

  const closeLightbox = () => {
    activeImageSrc.value = null;
  };

  return {
    activeImageSrc,
    openLightbox,
    closeLightbox,
  };
};
