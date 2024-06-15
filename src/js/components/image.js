export default () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
  } else {
    lazyLoadImages();
  }

  function lazyLoadImages() {
    var lazyImages = [...document.querySelectorAll('#imageId')];
    lazyImages.forEach((ele) => window.lazyImageFn(ele));
  }
};
