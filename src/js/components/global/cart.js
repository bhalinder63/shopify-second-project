import Cart from '../../vue/cart/Cart.vue';

import { createApp } from 'vue';
import store from '../../vue/store';

export const initCart = () => {
  const dom = {};
  const cacheDom = () => {
    dom.cartButton = document.querySelector('.js-cart-button');
    dom.cartQuantity = document.querySelector('.js-cart-quantity');
  };

  const bindUIActions = () => {
    dom.cartButton.addEventListener('click', () => {
      window.cart.toggleCart();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    bindUIActions();
  });

  const app = createApp(Cart);
  app.use(store);
  app.mount('#cartApp');
};
