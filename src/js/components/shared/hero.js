import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export const Hero = () => {
  const bindUIActions = () => {
    const heroCarousel = new Swiper('.swiper-container.js-hero-carousel', {
      modules: [Autoplay, Pagination],
      clickable: true,
      pagination: {
        el: '.swiper-pagination',
      },
      direction: 'horizontal',
      speed: 400,
      spaceBetween: 100,
      autoplay: {
        delay: 5000,
      },
    });
    heroCarousel;
  };
  bindUIActions();
};
