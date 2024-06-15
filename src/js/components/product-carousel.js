/* eslint-disable */
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export const pdpCarousel = () => {
  const swiper = new Swiper('.productCarousel--thumbs', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  const swiper2 = new Swiper('.productCarousel--main', {
    loop: true,
    spaceBetween: 10,
    thumbs: {
      swiper: swiper,
    },
  });
};
