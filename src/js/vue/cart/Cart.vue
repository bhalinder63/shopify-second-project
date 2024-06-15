<template>
  <div id="cart" :class="`cart ${cartOpen ? 'cart--visible' : ''}`">
    <div class="cart-drawer">
      <CartHeader />
      <CartItem v-for="item in cart.cartItems" :item="item" />
      <div
        class="cart-drawer__loading"
        v-if="
          loading.cart &&
          (cart.cartItems.length === 0 ||
            cart.cartItems.findIndex((i) => i.key == loading.cartItemId) === -1)
        "
      ></div>
      <div class="cart-drawer__total" v-if="cart.cartItems.length > 0">
        <p>Total</p>
        <p>{{ formatPrice(cart.total) }}</p>
      </div>
      <a
        class="button p-lg bold cart-drawer__checkout"
        v-if="cart.cartItems.length > 0"
        href="/checkout"
      >
        Checkout
      </a>
      <h2
        class="cart-drawer__empty"
        v-if="cart.cartItems.length === 0 && !loading.cart"
      >
        Nothing in the cart. Try our products!
      </h2>
    </div>
  </div>
</template>

<script setup>
import CartHeader from './CartHeader.vue';
import CartItem from './CartItem.vue';
import { ref } from 'vue';
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cartOpen = computed(() => store.getters.getCartOpen);
const cart = computed(() => store.getters.getCart);
const loading = computed(() => store.getters.getLoading);

const formatPrice = (price) => {
  return `$${(price / 100).toFixed(2)}`;
};

store.dispatch('initCart');
</script>
