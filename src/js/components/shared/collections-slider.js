import Swiper, { Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';

export const CollectionsSlider = () => {
  const bindUIActions = () => {
    const slider = document.querySelector('.js-collections-slider');

    const collectionsSlider = new Swiper(slider, {
      modules: [Scrollbar],
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        dragSize: 131,
      },
      speed: 400,
      spaceBetween: 20,
      slidesPerView: 1.1,
      breakpoints: {
        900: {
          slidesPerView: 3,
          scrollbar: {
            dragSize: 380,
          },
        },
        650: {
          slidesPerView: 2.2,
        },
        450: {
          slidesPerView: 1.8,
        },
        385: {
          slidesPerView: 1.2,
        },
      },
    });
    collectionsSlider;

    loadImages(slider);

    function loadImages(el) {
      const images = el.querySelectorAll('.image, .image-svg__elem');
      images.forEach((el) => {
        const lazyImages = (window.lazyImages = window.lazyImages || []);
        if (el && window.lazyImageFn) window.lazyImageFn(el);
        else if (el) lazyImages.push(el);
      });
    }
  };
  bindUIActions();
};
