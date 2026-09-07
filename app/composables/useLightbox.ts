export const useLightbox = () => {
  const activeImageSrc = useState('lightbox-src', () => null);

  const openLightbox = (src: any) => {
    activeImageSrc.value = src;
  };

  const closeLightbox = () => {
    activeImageSrc.value = null;
  };

  return {
    activeImageSrc,
    openLightbox,
    closeLightbox,
  };
};
