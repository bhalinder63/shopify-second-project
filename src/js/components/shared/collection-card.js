import Swiper, { Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';

export const CollectionCard = () => {
  const bindUIActions = () => {
    const collectionCard = new Swiper('.swiper-container.js-collection-card', {
      modules: [Scrollbar],
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        dragSize: 131,
      },
      speed: 400,
      spaceBetween: 20,
      slidesPerView: 1,
      breakpoints: {
        1200: {
          slidesPerView: 4,
          dragSize: 300,
        },
        900: {
          slidesPerView: 3,
          dragSize: 300,
        },
        600: {
          slidesPerView: 2,
          dragSize: 200,
        },
      },
    });
    collectionCard;
  };
  bindUIActions();
};
