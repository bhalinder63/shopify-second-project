import Swiper from 'swiper';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Controller,
} from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade, Controller]);

export default () => {
  const swipers = document.querySelectorAll('.swiper__carousel');
  const carouselFn = (el, cconfig) => {
    const { config } = el.dataset;
    const _config = cconfig || window[config];
    if (!_config) return alert('Please set data-config!');

    var swiper = new Swiper(el, _config);
    _config.$swiper = swiper;
    loadImages(el);

    function loadImages(el) {
      const images = el.querySelectorAll('.image, .image-svg__elem');
      images.forEach((el) => {
        const lazyImages = (window.lazyImages = window.lazyImages || []);
        if (el && window.lazyImageFn) window.lazyImageFn(el);
        else if (el) lazyImages.push(el);
      });
    }
  };

  swipers.forEach((el) => carouselFn(el));
  window.carouselFn = carouselFn;
};
